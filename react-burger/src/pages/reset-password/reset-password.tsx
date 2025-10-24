import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import Form, { Hint, InputContainer, Submit, Title } from "../../components/form";
import Layout from "../../components/layout/layout";

const ResetPassword: React.FC = () => {
    const [value, setValue] = React.useState("");

    return (
        <Layout>
            <Form>
                <Title>Восстановление пароля</Title>
                <InputContainer>
                    <PasswordInput name="password" value={value} onChange={(e) => setValue(e.target.value)} />
                </InputContainer>
                <InputContainer>
                    <Input
                        name="code"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        type="text"
                        placeholder="Введите код из письма"
                        error={false}
                        errorText="Ошибка"
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />
                </InputContainer>
                <Submit>Сохранить</Submit>
                <Hint linkHref="/login" linkTitle="Войти">
                    Вспомнили пароль?
                </Hint>
            </Form>
        </Layout>
    );
};

export default ResetPassword;
