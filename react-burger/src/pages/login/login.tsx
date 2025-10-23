import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Hint, InputContainer, Submit, Title } from "../../components/form";
import Form from "../../components/form/form";
import { useAppDispatch } from "../../services/hooks";
import { login } from "../../services/slices/user";
import Layout from "../../components/layout/layout";

const Login: React.FC = () => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (evt: React.SyntheticEvent) => {
        evt.preventDefault();
        const data = { email, password };
        dispatch(login(data));
    };

    return (
        <Layout>
            <Form onSubmit={handleSubmit}>
                <Title>Вход</Title>
                <InputContainer>
                    <Input
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="E-mail"
                        error={false}
                        errorText="Ошибка"
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />
                </InputContainer>
                <InputContainer>
                    <PasswordInput name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </InputContainer>
                <Submit>Войти</Submit>
                <Hint linkHref="/register" linkTitle="Зарегистрироваться">
                    Вы новый пользователь?
                </Hint>
                <Hint linkHref="/forgot-password" linkTitle="Восстановить пароль">
                    Забыли пароль?
                </Hint>
            </Form>
        </Layout>
    );
};

export default Login;
