import React from 'react';

import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, RichCell} from '@vkontakte/vkui';
import {Icon20ArticleOutline} from "@vkontakte/icons";

const Home = props => (
	<Panel id={props.id}>
		<PanelHeader>Наша команда</PanelHeader>

		<Group>
			{ props.users.map( (user) => {
				return <Group onClick={props.go} data-to="userInfo" data-userid={user.id} key={user.id}>
					<RichCell
						disabled
						before={<Avatar size={72} src={user.imgUrl} style={{objectFit:"cover"}}/>}
						caption={user.caption}
					>
						{user.name}
					</RichCell>

				</Group>
				})
			}
		</Group>
	</Panel>
);


export default Home;
