import React from "react";
import { useTranslation } from "react-i18next";
const Footer = () => {
	const { t } = useTranslation();
	var d = new Date();
	return (
		<div className="footer out-footer">
			<div className="copyright">
				<p>{t('copyRight')}
					{" " +d.getFullYear()}
				</p>
			</div>
		</div>
	);
};

export default Footer;
