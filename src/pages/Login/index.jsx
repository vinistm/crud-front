import * as yup from "yup";
import api from "../../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { Redirect } from "react-router-dom";
import Button from "../../components/Button";
import { FiMail, FiLock } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AnimationContainer, Background, Container, Content } from "./styles";

function Login({ authenticated, setAuthenticated }) {
  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório!"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 dígitos!")
      .required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const onSubmitFuncion = (data) => {
    api
      .post("/user/login", data)
      .then((response) => {
        const { token, user } = response.data;

        localStorage.setItem("@Doit:token", JSON.stringify(token));

        localStorage.setItem("@Doit:user", JSON.stringify(user));

        setAuthenticated(true);

        return history.push("/dashboard");
      })
      .catch((err) => toast.error("Email ou senha inválidos!"));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFuncion)}>
            <h1>Login</h1>

            <Input
              register={register}
              name="email"
              icon={FiMail}
              label="Email"
              placeholder="Seu melhor email"
              error={errors.email?.message}
            />
            <Input
              register={register}
              name="password"
              icon={FiLock}
              label="Senha"
              placeholder="Uma senha bem segura"
              type="password"
              error={errors.password?.message}
            />

            <Button type="submit">Enviar</Button>
            <p>
              Não tem conta? <Link to="/signup">Faça seu cadastro</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}

export default Login;
