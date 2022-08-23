// eslint-disable-next-line import/no-extraneous-dependencies
import { IAuthResponse } from "@/features/authentication";
import { ActiveModelSerializer, createServer, Factory, Model } from "miragejs";

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      user: Model.extend<Partial<User>>({}),
    },
    factories: {
      user: Factory.extend({
        name() {
          return "jonathan rehem";
        },
        email() {
          return "jonathan.de.oliveira@live.com";
        },
        createdAt() {
          return new Date();
        },
        token() {
          return "string";
        },
        refreshToken() {
          return "string";
        },
      }),
    },
    seeds(_server) {
      _server.create("user", {
        id: "1",
        email: "jonathan.de.oliveira@live.com",
        name: "jonathan rehem",
        createdAt: new Date(),
      });
    },
    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.post("/auth/login", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const user = schema.findBy("user", { email: attrs.email });
        if (user?.email === attrs.email) {
          return {
            data: {
              createdAt: user?.createdAt,
              email: user?.email,
              id: user?.id,
              name: user?.name,
              refreshToken: "string",
              token: "string",
            },
          };
        }

        return null;
      });

      this.post("auth/register", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return {
          data: {
            user: attrs.email,
            token: "string",
            refreshToken: "string",
          },
        };
      });
    },
  });

  return server;
}
