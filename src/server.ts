import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: 'string-plus-server',
  version: '1.0.0',
});

server.tool(
  'add',
  {
    numFirst: z.number(),
    numSecond: z.number(),
  },
  async ({ numFirst, numSecond }) => {
    return {
      content: [{ type: 'text', text: `The sum is ${numFirst + numSecond}` }],
    };
  },
);

server.resource(
  'greeting',
  new ResourceTemplate('greeting://{name}', { list: undefined}),
  async (uri, { name }) => ({
    content: [{ uri: uri.href, text: `Hello ${name}` }],
  }),
);

const transport = new StdioServerTransport();
server.connect(transport);


