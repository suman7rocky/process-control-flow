import { Card, CardHeader, Icon } from "@ui5/webcomponents-react";

type RiskCardProps = {
	header: string;
	icon: string;
	risk: string;
	desciption: string;
};

const getRiskColor = (risk: number): string => {
	if (risk >= 0 && risk <= 30) {
		return "bg-green-500";
	} else if (risk > 30 && risk <= 70) {
		return "bg-yellow-500";
	} else if (risk > 70 && risk <= 100) {
		return "bg-red-500";
	}
	return "";
};

const RiskCard = ({ header, icon, risk, desciption }: RiskCardProps) => {
	return (
		<Card
			header={
				<CardHeader
					avatar={<Icon name={icon} />}
					titleText={header}
				/>
			}
			style={{
				width: "30rem",
				position: "relative",
			}}>
			<span
				className={`rounded font-bold absolute text-white p-2 top-5 right-9 ${getRiskColor(
					Number(risk)
				)}`}>
				Risk : {risk}
			</span>

			<div className="p-3 text-center">
				<p className="">{desciption}</p>
			</div>
		</Card>
	);
};

export default RiskCard;
