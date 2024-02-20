import {
	Avatar,
	Bar,
	Button,
	Icon,
	ListPropTypes,
	ResponsivePopoverDomRef,
	Title,
} from "@ui5/webcomponents-react";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { getTheme } from "@ui5/webcomponents-base/dist/InitialConfiguration.js";
import ThemeSwitchPopover from "./ThemeSwitchPopover";

type NavBarProps = {
	companyName: string;
	companyLogo: string;
	productName: string;
	isNotifiction?: boolean;
	notificationCount?: string;
	userName: string;
	userImage: string;
	callback: (isCollapsed: boolean) => void;
};

const NavBar = ({
	companyName,
	companyLogo,
	productName,
	isNotifiction,
	callback,
	userImage,
	userName,
	notificationCount,
}: NavBarProps) => {
	const [currentTheme, setCurrentTheme] = useState(getTheme);
	const [isCollapseSidebar, setCollapseSidebar] = useState(true);
	const popoverRef = useRef<ResponsivePopoverDomRef | null>(null);

	//handling theme switch
	const handleThemeSwitch: ListPropTypes["onSelectionChange"] = (e) => {
		const { targetItem } = e.detail;
		const selectedTheme: string = targetItem.dataset.key!;
		setTheme(targetItem.dataset.key!);
		setCurrentTheme(targetItem.dataset.key!);
		localStorage.setItem("Theme", selectedTheme);
	};

	//handling theme switch
	const handleThemeSwitchItemClick: MouseEventHandler<HTMLElement> = (e) => {
		popoverRef.current?.showAt(e.currentTarget);
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
			<Bar
				style={{ marginTop: "4px" }}
				design="Header"
				endContent={
					<>
						<Icon
							name="palette"
							className="cursor-pointer m-3"
							onClick={handleThemeSwitchItemClick}
						/>

						{/* conditionally rendering Notifiction */}
						{isNotifiction && (
							<Button
								style={{
									position: "relative",
									display: "inline-block",
									margin: "0.75rem",
								}}
								data-notification-count={notificationCount}
								className="notification-button"
								design="Transparent"
								icon="bell"
							/>
						)}

						{/* user profile */}
						<Avatar className="cursor-pointer w-10 h-10 rounded-full outline-none m-3">
							<img
								className="w-full h-full rounded-full object-cover"
								src={userImage}
								alt={userName}
							/>
						</Avatar>
					</>
				}
				startContent={
					<>
						{/* SideNavbar toggle */}
						<Button
							design="Transparent"
							icon="menu2"
							onClick={handleNavMenuButtonclick}
						/>

						{/* company logo */}
						<img
							className="h-12 w-12 rounded-full object-cover"
							src={companyLogo}
							alt={`${companyName} Logo`}
						/>
						<Title>{productName}</Title>
					</>
				}></Bar>

			{/* Theme Popover */}
			<ThemeSwitchPopover
				currentTheme={currentTheme}
				popoverRef={popoverRef}
				handleThemeSwitch={handleThemeSwitch}
			/>
		</>
	);
};

export default NavBar;
