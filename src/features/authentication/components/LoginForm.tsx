import { CheckboxInput, Form, TextInput, Link } from "@/components";
import { z } from "@/lib/zod";
import {
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Flex,
} from "@/lib/chakra-ui";
import { useAuth } from "@/features/authentication";
import { IAuthCredentials } from "../types";

const schema = z.object({
  email: z
    .string()
    .min(1, "É necessário informar o e-mail!")
    .email("Informe um e-mail válido!"),
  password: z.string().min(1, "É necessário informar a senha!"),
  rememberMe: z.boolean().optional(),
});

type LoginFormProps = {
  title: string;
};

export function LoginForm({ title }: LoginFormProps) {
  const { login } = useAuth();

  async function handleSubmit(formData: IAuthCredentials) {
    await login(formData);
  }

  return (
    <Flex
      rounded="lg"
      bg={useColorModeValue("white", "gray.700")}
      boxShadow="lg"
      p="0"
      w="xl"
      h="xl"
      alignItems="center"
      justifyContent="center"
    >
      <Stack spacing="8" w="full" maxW="lg">
        <Heading fontSize="2xl">{title}</Heading>
        <Form<IAuthCredentials, typeof schema>
          onSubmit={async values => handleSubmit(values)}
          schema={schema}
        >
          {({ register, formState }) => (
            <Stack>
              <TextInput
                name="email"
                label="E-mail"
                error={formState.errors.email}
                registration={register("email")}
              />
              <TextInput
                name="password"
                label="Senha"
                error={formState.errors.password}
                registration={register("password")}
              />
              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align="start"
                  justify="space-between"
                >
                  <CheckboxInput
                    label="Lembrar de mim"
                    registration={register("rememberMe")}
                  />

                  <Link to="/forget" color="blue.500">
                    Esqueceu a senha?
                  </Link>
                </Stack>
                <Button colorScheme="blue" variant="solid" type="submit">
                  Entrar
                </Button>
                <Stack pt={6}>
                  <Text align="center">
                    Não possui uma conta?{" "}
                    <Link to="/auth/register" color="blue.400">
                      Registrar
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          )}
        </Form>
      </Stack>
    </Flex>
  );
}
