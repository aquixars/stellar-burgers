// src/pages/forgot-password/forgot-password.tsx
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import Form, { Hint, InputContainer, Submit, Title } from "../../components/form";
import { useAppDispatch } from "../../services/hooks";
import { forgotPassword, allowPasswordReset } from "../../services/slices/user";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/layout";

const ForgotPassword: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = React.useState("");

    const handleSubmit = async (evt: React.SyntheticEvent) => {
        evt.preventDefault();
        const resultAction = await dispatch(forgotPassword(email));
        if (forgotPassword.fulfilled.match(resultAction)) {
            dispatch(allowPasswordReset());
            navigate("/reset-password", { replace: true });
        }
    };

    return (
        <Layout>
            <Form onSubmit={handleSubmit}>
                <Title>Восстановление пароля</Title>
                <InputContainer>
                    <Input
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Укажите e-mail"
                        error={false}
                        errorText="Ошибка"
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />
                </InputContainer>
                <Submit>Восстановить</Submit>
                <Hint linkHref="/login" linkTitle="Войти">
                    Вспомнили пароль?
                </Hint>
            </Form>
        </Layout>
    );
};

export default ForgotPassword;
