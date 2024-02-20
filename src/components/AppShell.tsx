import {
	getTheme,
	setTheme,
} from "@ui5/webcomponents-base/dist/config/Theme.js";
import paletteIcon from "@ui5/webcomponents-icons/dist/palette.js";
import {
	Avatar,
	Button,
	ListPropTypes,
	ResponsivePopoverDomRef,
	ShellBar,
	ShellBarItem,
	ShellBarItemPropTypes,
} from "@ui5/webcomponents-react";
import { useEffect, useRef, useState } from "react";
import ThemeSwitchPopover from "./ThemeSwitchPopover";

type AppShellProps = {
	companyName: string;
	companyLogo: string;
	productName: string;
	isNotifiction?: boolean;
	notificationCount?: string;
	userName: string;
	userImage: string;
	callback: (isCollapsed: boolean) => void;
	themeSwitch: (theme: string) => void;
};

const AppShell = ({
	companyLogo,
	companyName,
	productName,
	isNotifiction,
	notificationCount,
	userName,
	userImage,
	callback,
	themeSwitch,
}: AppShellProps) => {
	const [currentTheme, setCurrentTheme] = useState(getTheme);
	const [isCollapseSidebar, setCollapseSidebar] = useState(true);
	const popoverRef = useRef<ResponsivePopoverDomRef | null>(null);

	const handleThemeSwitch: ListPropTypes["onSelectionChange"] = (e) => {
		const { targetItem } = e.detail;
		const selectedTheme: string = targetItem.dataset.key!;
		setTheme(targetItem.dataset.key!);
		setCurrentTheme(targetItem.dataset.key!);
		localStorage.setItem("Theme", selectedTheme);
		if (selectedTheme && themeSwitch) {
			themeSwitch(selectedTheme);
		}
	};
	const handleThemeSwitchItemClick: ShellBarItemPropTypes["onClick"] = (e) => {
		popoverRef.current?.showAt(e.detail.targetRef);
	};

	const handleNavMenuButtonclick = () => {
		setCollapseSidebar((isCollapseSidebar) => !isCollapseSidebar);
		callback(isCollapseSidebar);
	};

	useEffect(() => {
		const storedTheme: string | null = localStorage.getItem("Theme");
		if (storedTheme) {
			setCurrentTheme(storedTheme);
			setTheme(storedTheme);
		}
	}, []);
	return (
		<>
			<ShellBar
				style={{
					position: "relative",
					marginTop: "0.2rem",
					marginLeft: "0.4rem",
					borderRadius: "0.30rem",
					width: "calc(100dvw - 0.75rem)",
				}}
				logo={
					<img
						className="h-12 w-12 rounded-full object-cover"
						src={companyLogo}
						alt={`${companyName} Logo`}
					/>
				}
				primaryTitle={productName}
				profile={
					<Avatar className="cursor-pointer w-10 h-10 rounded-full outline-none">
						<img
							className="w-full h-full rounded-full object-cover"
							src={userImage}
							alt={userName}
						/>
					</Avatar>
				}
				showNotifications={isNotifiction}
				startButton={
					<Button
						style={{
							position: "absolute",
							left: "0.6rem",
						}}
						className="mr-4"
						design="Emphasized"
						icon="menu2"
						onClick={handleNavMenuButtonclick}
					/>
				}
				notificationsCount={notificationCount}>
				<ShellBarItem
					icon={paletteIcon}
					text="Change Theme"
					onClick={handleThemeSwitchItemClick}
				/>
			</ShellBar>

			<ThemeSwitchPopover
				currentTheme={currentTheme}
				popoverRef={popoverRef}
				handleThemeSwitch={handleThemeSwitch}
			/>
		</>
	);
};

export default AppShell;
