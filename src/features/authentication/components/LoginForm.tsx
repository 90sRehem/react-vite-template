import {
  CheckboxInput,
  Form,
  TextInput,
  Link,
  PasswordInput,
  Backdrop,
} from "@/components";
import { z } from "@/lib/zod";
import {
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Flex,
  useMediaQuery,
  DrawerOverlay,
  Modal,
  ModalOverlay,
  Spinner,
  ModalContent,
} from "@/lib/chakra-ui";
// import { useAuth } from "@/features/authentication";
import { useAuthStore } from "../stores/authStore";
import { IAuthCredentials } from "../types";

const schema = z.object({
  email: z
    .string()
    .min(1, "É necessário informar o e-mail!")
    .email("Informe um e-mail válido!"),
  password: z
    .string()
    .min(1, "A senha é obrigatória!")
    .min(6, "A senha deve ter no mínimo 6 caracteres!"),
  rememberMe: z.boolean().optional(),
});

type LoginFormProps = {
  onSuccess: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const login = useAuthStore(state => state.login);
  const isLoading = useAuthStore(state => state.isLoading);
  const [isLargerThan1280] = useMediaQuery("(min-width: 768px)");
  const bg = useColorModeValue("white", "gray.700");

  async function handleSubmit(formData: IAuthCredentials) {
    await login(formData, () => onSuccess());
  }

  return (
    <>
      <Backdrop isOpen={isLoading} />
      <Flex
        rounded="lg"
        bg={isLargerThan1280 ? bg : ""}
        boxShadow={isLargerThan1280 ? "lg" : ""}
        p="0"
        w="xl"
        h="xl"
        alignItems="center"
        justifyContent="center"
      >
        <Stack spacing="8" w="full" maxW="lg">
          <Heading fontSize="2xl">Entre com sua conta.</Heading>
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
                <PasswordInput
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
    </>
  );
}
