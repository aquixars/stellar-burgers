import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useMemo } from "react";
import { InputContainer } from "../form";

import styles from "./edit-profile.module.css";
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { selectUser, patchUser } from "../../services/slices/user";

const EditProfile = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const shouldShowButtons = useMemo(() => name !== user.name || email !== user.email, [user, name, email]);

    const handleSubmit = (evt: React.SyntheticEvent) => {
        evt.preventDefault();
        dispatch(patchUser({ name, email }));
    };

    const handleReset = () => {
        setName(user.name);
        setEmail(user.email);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <InputContainer>
                <Input
                    name="name"
                    type="text"
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                    icon="EditIcon"
                    placeholder="Имя"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
            </InputContainer>

            <InputContainer>
                <Input
                    name="login"
                    type="text"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                    icon="EditIcon"
                    placeholder="Логин"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
            </InputContainer>

            <InputContainer>
                <Input
                    name="password"
                    type="password"
                    value="password"
                    onChange={() => {}}
                    icon="EditIcon"
                    placeholder="Пароль"
                    disabled
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
            </InputContainer>

            {shouldShowButtons && (
                <div className={styles.buttons}>
                    <Button type="secondary" size="medium" onClick={handleReset} htmlType={"button"}>
                        Отмена
                    </Button>
                    <Button htmlType={"button"}>Сохранить</Button>
                </div>
            )}
        </form>
    );
};

export default EditProfile;
