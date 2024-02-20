import { useState } from "react";

import { Label, Page } from "@ui5/webcomponents-react";
import { FlexBox } from "@ui5/webcomponents-react";
import employeeIcon from "@ui5/webcomponents-icons/dist/employee.js";
import companyLogo from "./images/irm.png";
import userImage from "./images/userImages/user1.jpg";

import AppShell from "./components/AppShell";
import SideNavbar from "./components/SideNavbar";
import CustomComponent from "./components/CustomComponent";
import DateTimePickerCard from "./components/DateTimePickerCard";
import routes from "./lib/data";
import RiskCard from "./components/RiskCard";
import cardData from "./lib/cardData";

function App() {
	const [isCollapsed, setIsCollapse] = useState(false);
	const [theme, setTheme] = useState("sap_horizon");

	let bg: string;

	if (theme === "sap_horizon_hcb" || theme === "sap_horizon_dark") {
		bg = "bg-gray-700";
	} else {
		bg = "bg-gray-300";
	}
	return (
		<div className={`overflow-hidden ${bg} relative transition-all`}>
			<AppShell
				companyName="TRP Global"
				productName="Process Control Flow"
				isNotifiction={true}
				notificationCount="10"
				companyLogo={companyLogo}
				userImage={userImage}
				userName="John Doe"
				callback={setIsCollapse}
				themeSwitch={setTheme}
			/>

			<FlexBox
				style={{
					height: "92dvh",
					marginTop: "0.50rem",
					columnGap: "0.50rem",
					marginRight: "0.50rem",
					paddingLeft: "0.4rem",
					marginBottom: "0.3rem",
				}}>
				<SideNavbar
					items={routes}
					isCollapsed={isCollapsed}
				/>

				<Page
					backgroundDesign="Solid"
					className="page transition-all"
					style={{
						borderRadius: "6rem",
					}}>
					<div className="flex flex-col flex-grow w-[90vw] p-2 h-full">
						<p className="text-center text-2xl font-bold mt-4">
							Welcome to UI5 Remote
						</p>
						<div className="flex gap-x-3 text-center justify-center items-center mt-5">
							<Label className="font-semibold text-lg">Select Date-Time</Label>
							<DateTimePickerCard />
						</div>

						<div className="flex justify-center">
							<CustomComponent
								icon={employeeIcon}
								cssStyles={
									"text-black bg-gray-200 active:outline-none focus:!outline-none active:border-none p-2 rounded-md mt-4 hover:bg-gray-600 scale-100 hover:outline-none hover:border-none border-none hover:text-white scale-105 transition-all duration-300 ease-in-out"
								}
							/>
						</div>
						<div className="p-2 flex flex-col md:flex-row gap-x-2 justify-between">
							<div className="flex gap-3">
								{cardData.map((card, index) => (
									<RiskCard
										key={index}
										header={card.header}
										icon={card.icon}
										risk={card.risk}
										desciption={card.desciption}
									/>
								))}
							</div>
						</div>
					</div>
				</Page>
			</FlexBox>
		</div>
	);
}

export default App;
