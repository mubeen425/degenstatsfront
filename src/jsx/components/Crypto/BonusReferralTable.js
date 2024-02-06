import React from "react";
import { Card, Col, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function BonusReferralTable(props) {
  const getFormattedDate = (date) => {
    //get only day and month in english
    const d = new Date(date);
    const month = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();
    return `${day} ${month}`;
  };
  const { t } = useTranslation();
  return (
    <Col lg={12}>
      <Card>
        <Card.Header>
          <Card.Title>{t("referred_transaction")}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>{t("wallet_address")}</th>

                <th>{t("date")}</th>
                <th>USDT</th>
              </tr>
            </thead>
            <tbody>
              {props.referralData.map((data, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{data.wallet_address}</td>

                  <td>{getFormattedDate(data.createdAt)}</td>
                  <td className="color-success">{data.reward} USDT</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Col>
  );
}
