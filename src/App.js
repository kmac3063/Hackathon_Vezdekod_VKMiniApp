import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/example_panels/Home';
import Persik from './panels/example_panels/Persik';
import UserInfo from "./panels/UserInfo";

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [selectedUserId, setSelectedUserId] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	const users = [{
		id:"purple_murder4you",
		name:"Игорь Ланцов",
		caption:"FEFU | CODE work | Yandex | 3 курс🏆",
		imgUrl:"https://sun9-23.userapi.com/impg/XJflyMu7D4MuYrm8tUlfObLJahUgKfVG0Q5fRg/wHy3nA44pyA.jpg?size=1280x960&quality=96&sign=ca796491f6b202a28b148d749b520ce7&type=album",
		location:"Чебоксары",
		work:"ДВФУ",
		description:"Это наш Игорь. Он занимается андройд разработкой и хочет стать самым сильным разработчиком в мире! Игорь также играет на гитаре, много гуляет и любит китов."
	}, {
		id:"ephemeralsad",
		name:"Александр Саранцев",
		caption:"Иди вперёд. Через страх.",
		imgUrl:"https://sun9-70.userapi.com/impf/c854124/v854124186/a331f/QkhBDsJXU-k.jpg?size=604x453&quality=96&sign=3c0df576517dfe1cf043891b35163845&type=album",
		location:"Владивосток",
		work:"ДВФУ",
		description:"Это наш Саша. Саша занимается олимпиадной разработкой, любит алгоритмы и сложные задачи. Также он с радостью поиграет с вами в большой теннис и поест пельменей."
	}, {
		id:"alexfromag",
		name:"Алексей Лепёха",
		caption:"FEFU",
		imgUrl:"https://sun9-66.userapi.com/impg/8NDXGhopFHy1MAXsgLxQA0uIfx2KQbrdspQNdA/3QltfQTK2EA.jpg?size=1200x1600&quality=96&sign=38ed40016e43a164d85ffe6909d1dd40&type=album",
		location:"Благовещенск",
		work:"ДВФУ",
		description:"Это наш Лёша. Лёша изучает искусственный интеллект, поёт в хоре и играет на гитаре. Лёша в прошлом отличноый пловец, даже имеет за собой победы. В этом году Лёша вместе со своим коллективом стал лучшим студенческим хором России!"
	}, {
		id:"damnpager",
		name:"Юра Ерилов",
		caption:"1 мая",
		imgUrl:"https://sun9-2.userapi.com/impg/cbPam2cBCekz2W2ua093kWvAU1pExXuUrz8lDQ/LffohAe8cL4.jpg?size=1440x2160&quality=96&sign=661654874d28bdd7c1aabedae75b5fe1&type=album",
		location:"Владивосток",
		work:"ДВФУ",
		description:"Это наш Юра. Юра наш основной дизайнер. Умеет мастерски владеть Фигмой, справляться со стрессом и не пать сутками. Юра задизайнил нам уже десятки проектов и продолжает делать это прямо сейчас :)."
	}]

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			setPopout(null);
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
		if (e.currentTarget.dataset.userid !== null)
			setSelectedUserId(e.currentTarget.dataset.userid)
	};

	const getUser = (selectedUserId) => {
		for (let i = 0; i < users.length; i++) {
			if (users[i].id === selectedUserId)
				return users[i]
		}
		return users[0]
	}

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} popout={popout}>
					<Home id='home' go={go} users={users}/>
					<UserInfo id='userInfo' go={go} user={getUser(selectedUserId)}/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
