import React from "react";
import {Avatar, Group, MiniInfoCell, Panel, PanelHeader, PanelHeaderBack, RichCell} from "@vkontakte/vkui";
import persik from "../img/persik.png";
import {Icon20ArticleOutline, Icon20PlaceOutline, Icon20WorkOutline} from "@vkontakte/icons";

const UserInfo = ({id, go, user}) => (
    <Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>
            {user.id}
        </PanelHeader>
        <Group>
            <RichCell
                disabled
                before={<Avatar size={72} src={user.imgUrl} style={{objectFit:"cover"}}/>}
                caption={user.caption}
            >
                {user.name}
            </RichCell>
            <MiniInfoCell
                before={<Icon20PlaceOutline />}
            >
                {user.location}
            </MiniInfoCell>
            <MiniInfoCell
                before={<Icon20WorkOutline/>}>
                {user.work}
            </MiniInfoCell>
            <MiniInfoCell
                before={<Icon20ArticleOutline />}
                textWrap="full"
                textLevel="primary"
            >
                {user.description}
            </MiniInfoCell>
        </Group>
    </Panel>
)

export default UserInfo;