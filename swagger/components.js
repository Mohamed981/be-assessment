module.exports = {
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Todo identification number",
            example: "name",
          },
          password: {
            type: "string",
            description: "Todo's title",
            example: "12345",
          },
        },
      },
    },
  },
};
