// src/pages/register/register.tsx
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import Form, { Hint, InputContainer, Submit, Title } from "../../components/form";
import { useAppDispatch } from "../../services/hooks";
import { register } from "../../services/slices/user";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/layout";

const Register: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (evt: React.SyntheticEvent) => {
        evt.preventDefault();
        const data = { name, email, password };
        const resultAction = await dispatch(register(data));
        if (register.fulfilled.match(resultAction)) {
            navigate("/", { replace: true });
        }
    };

    return (
        <Layout>
            <Form onSubmit={handleSubmit}>
                <Title>Регистрация</Title>

                <InputContainer>
                    <Input
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Имя"
                        error={false}
                        errorText="Ошибка"
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />
                </InputContainer>

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

                <Submit>Зарегистрироваться</Submit>

                <Hint linkHref="/login" linkTitle="Войти">
                    Уже зарегистрированы?
                </Hint>
            </Form>
        </Layout>
    );
};

export default Register;
