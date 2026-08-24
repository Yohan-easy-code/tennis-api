export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Tennis API",
    version: "1.0.0",
    description:
      "API REST permettant de gérer des joueurs de tennis et leurs statistiques.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development",
    },
  ],
  paths: {
    "/health": {
      get: {
        summary: "Check API health",
        responses: {
          "200": {
            description: "API is healthy",
          },
        },
      },
    },

    "/api/players": {
      get: {
        summary: "Get all players sorted by rank",
        responses: {
          "200": {
            description: "Players returned successfully",
          },
        },
      },

      post: {
        summary: "Create a new player",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Player",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Player created successfully",
          },
          "400": {
            description: "Invalid request body",
          },
          "409": {
            description: "Player already exists",
          },
        },
      },
    },

    "/api/players/{id}": {
      get: {
        summary: "Get a player by id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Player returned successfully",
          },
          "404": {
            description: "Player not found",
          },
        },
      },
    },

    "/api/stats": {
      get: {
        summary: "Get tennis statistics",
        responses: {
          "200": {
            description: "Statistics returned successfully",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Player: {
        type: "object",
        required: [
          "id",
          "firstname",
          "lastname",
          "shortname",
          "sex",
          "country",
          "picture",
          "data",
        ],
        properties: {
          id: {
            type: "integer",
            example: 120,
          },

          firstname: {
            type: "string",
            example: "Roger",
          },

          lastname: {
            type: "string",
            example: "Federer",
          },

          shortname: {
            type: "string",
            example: "R.FED",
          },

          sex: {
            type: "string",
            enum: ["M", "F"],
          },

          country: {
            type: "object",
            properties: {
              picture: {
                type: "string",
                format: "uri",
              },
              code: {
                type: "string",
                example: "SUI",
              },
            },
          },

          picture: {
            type: "string",
            format: "uri",
          },

          data: {
            type: "object",
            properties: {
              rank: {
                type: "integer",
                example: 3,
              },
              points: {
                type: "integer",
                example: 3500,
              },
              weight: {
                type: "integer",
                example: 85000,
              },
              height: {
                type: "integer",
                example: 185,
              },
              age: {
                type: "integer",
                example: 41,
              },
              last: {
                type: "array",
                items: {
                  type: "integer",
                  enum: [0, 1],
                },
                example: [1, 1, 1, 0, 1],
              },
            },
          },
        },
      },
    },
  },
};
