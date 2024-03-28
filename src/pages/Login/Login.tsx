// Login.tsx
import style from "./Login.module.css";
import { BoxBase, Button, FieldText } from "../../components";
import { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "../../hook/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate()

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signIn({ email, password });
      navigate("/home")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.container}>
      <BoxBase>
        <h2>Acessar aplicação</h2>
        <form className={style.form} onSubmit={handleSubmit}>
          <FieldText.BaseInput>
            <FieldText.Label label="email">E-mail:</FieldText.Label>
            <FieldText.Input
              label="email"
              placeholder="nome@email.com"
              type="email"
              value={email}
              onChange={handleEmail}
              required
            />
          </FieldText.BaseInput>
          <FieldText.BaseInput>
            <FieldText.Label label="password">Senha:</FieldText.Label>
            <FieldText.Input
              label="password"
              placeholder="Sua senha"
              type="password"
              value={password}
              onChange={handlePassword}
              required
            />
          </FieldText.BaseInput>
          <Button type="submit">Entrar</Button>
        </form>
      </BoxBase>
    </div>
  );
}
