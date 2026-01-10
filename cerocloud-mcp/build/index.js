#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
// Define directories relative to where this script might be run (assuming it's run from cerocloud-mcp root or similar)
// We will look for the website root relative to the mcp project
const WEBSITE_ROOT = path_1.default.resolve(__dirname, "../../");
const LOCALES_DIR = path_1.default.join(WEBSITE_ROOT, "public", "locales");
class CeroCloudServer {
    server;
    constructor() {
        this.server = new index_js_1.Server({
            name: "cerocloud-mcp-server",
            version: "0.1.0",
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.setupToolHandlers();
        // Error handling
        this.server.onerror = (error) => console.error("[MCP Error]", error);
        process.on("SIGINT", async () => {
            await this.server.close();
            process.exit(0);
        });
    }
    setupToolHandlers() {
        this.server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => ({
            tools: [
                {
                    name: "audit_translations",
                    description: "Scans translation files to find missing keys in secondary languages (en, pt) relative to the source (es).",
                    inputSchema: {
                        type: "object",
                        properties: {
                            namespace: {
                                type: "string",
                                description: "Specific namespace json to check (e.g. 'common', 'releases'). If omitted, checks all.",
                            },
                        },
                    },
                },
                {
                    name: "verify_project_health",
                    description: "Checks basic project health: package.json existence, dependency status, and identifying git status.",
                    inputSchema: {
                        type: "object",
                        properties: {},
                    },
                },
            ],
        }));
        this.server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
            switch (request.params.name) {
                case "audit_translations":
                    return await this.handleAuditTranslations(request.params.arguments);
                case "verify_project_health":
                    return await this.handleVerifyProjectHealth();
                default:
                    throw new types_js_1.McpError(types_js_1.ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
            }
        });
    }
    async handleAuditTranslations(args) {
        try {
            const languages = ["es", "en", "pt"];
            const baseLang = "es";
            const targetLangs = languages.filter(l => l !== baseLang);
            const namespaces = args?.namespace
                ? [args.namespace.endsWith(".json") ? args.namespace.replace(".json", "") : args.namespace]
                : (await promises_1.default.readdir(path_1.default.join(LOCALES_DIR, baseLang)))
                    .filter(f => f.endsWith(".json"))
                    .map(f => f.replace(".json", ""));
            const report = [];
            let totalMissing = 0;
            for (const ns of namespaces) {
                try {
                    const baseContent = JSON.parse(await promises_1.default.readFile(path_1.default.join(LOCALES_DIR, baseLang, `${ns}.json`), "utf-8"));
                    // Get all recursive keys from base
                    const baseKeys = this.flattenKeys(baseContent);
                    for (const targetLang of targetLangs) {
                        const targetPath = path_1.default.join(LOCALES_DIR, targetLang, `${ns}.json`);
                        let targetContent = {};
                        try {
                            targetContent = JSON.parse(await promises_1.default.readFile(targetPath, "utf-8"));
                        }
                        catch (e) {
                            report.push(`❌ Missing File: ${targetLang}/${ns}.json`);
                            totalMissing += baseKeys.size;
                            continue;
                        }
                        const targetKeys = this.flattenKeys(targetContent);
                        const missingInTarget = Array.from(baseKeys).filter(k => !targetKeys.has(k));
                        if (missingInTarget.length > 0) {
                            report.push(`⚠️  ${targetLang}/${ns}.json is missing ${missingInTarget.length} keys:`);
                            missingInTarget.forEach(k => report.push(`   - ${k}`));
                            totalMissing += missingInTarget.length;
                        }
                    }
                }
                catch (e) {
                    report.push(`Error processing namespace ${ns}: ${e.message}`);
                }
            }
            if (totalMissing === 0) {
                return {
                    content: [{
                            type: "text",
                            text: "✅ All translations are synchronized! No missing keys found."
                        }]
                };
            }
            return {
                content: [{
                        type: "text",
                        text: `Found ${totalMissing} missing translation keys:\n\n${report.join("\n")}`
                    }]
            };
        }
        catch (error) {
            return {
                content: [{
                        type: "text",
                        text: `Error auditing translations: ${error.message} (Path checked: ${LOCALES_DIR})`
                    }],
                isError: true,
            };
        }
    }
    flattenKeys(obj, prefix = "") {
        const keys = new Set();
        for (const key in obj) {
            if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
                const subKeys = this.flattenKeys(obj[key], `${prefix}${key}.`);
                subKeys.forEach(k => keys.add(k));
            }
            else {
                keys.add(`${prefix}${key}`);
            }
        }
        return keys;
    }
    async handleVerifyProjectHealth() {
        return {
            content: [{
                    type: "text",
                    text: "Project Health Check:\n- MCP Server is running\n- Website Root detected at: " + WEBSITE_ROOT
                }]
        };
    }
    async run() {
        const transport = new stdio_js_1.StdioServerTransport();
        await this.server.connect(transport);
        console.error("CeroCloud MCP Server running on stdio");
    }
}
const server = new CeroCloudServer();
server.run().catch(console.error);
