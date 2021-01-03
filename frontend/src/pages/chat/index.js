import React, { useState, useEffect } from "react";

import { Container } from "./styles";

//componenets
import Header from "./components/header/index";
import ChatText from "./components/chatText/index";
import Chat from "./components/chat/index";
import Persons from "./components/persons/index";

//configs
import { socket } from "../../configs/socket_export";

//context
import { useUser } from "../context/allusers";

//scripts
import draggable from "./scripts/draggable";

const ChatUser = (props) => {
    const { getPerson } = useUser();

    const [person, setPerson] = useState({});

    const minimizeChat = (socketidperson) => {
        socket.emit("change visible chat", socketidperson);
    };

    const closeChat = (socketidperson) => {
        socket.emit("close chat", socketidperson);
    };

    useEffect(() => {
        draggable();
        if (getPerson(props.socketidperson)) setPerson(getPerson(props.socketidperson)); //Verifica o person atraves do socketidperson passado por props, pegando o objeto do backend
        console.log(person);
    });

    return (
        <Container className="draggable-chat" visible={props.visible}>
            <div id="header-chat-top">
                <button onClick={() => minimizeChat(props.socketidperson)}>Minimizar</button>
                <button onClick={() => closeChat(props.socketidperson)}>Fechar</button>
                {props.children}
            </div>
            <div id="chat-top">
                <Header username={person.username} subnick={person.subnick} status={person.status} />
            </div>
            <div id="chat-conversation">
                <div id="chat-conversation-left">
                    <ChatText />
                    <Chat />
                </div>
                <div id="chat-conversation-right">
                    <Persons />
                </div>
            </div>
        </Container>
    );
};

export default ChatUser;
