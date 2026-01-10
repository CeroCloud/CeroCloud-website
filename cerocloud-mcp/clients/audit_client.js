
const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { StdioClientTransport } = require("@modelcontextprotocol/sdk/client/stdio.js");

async function main() {
    const transport = new StdioClientTransport({
        command: "node",
        args: ["cerocloud-mcp/build/index.js"]
    });

    const client = new Client(
        { name: "audit-client", version: "1.0.0" },
        { capabilities: {} }
    );

    await client.connect(transport);

    console.log("Auditing translation files...");
    const result = await client.callTool({
        name: "audit_translations",
        arguments: {}
    });

    console.log(result.content[0].text);
    await client.close();
}

main().catch(console.error);
