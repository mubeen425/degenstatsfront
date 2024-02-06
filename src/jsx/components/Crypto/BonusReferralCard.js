import React from "react";
import { Card, Col, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function BonusReferralCard(props) {
  const { t } = useTranslation();
  return (
    <Col lg={12}>
      <Card>
        <Card.Header>
          <Card.Title>{t("you_are_currently_referred_by")}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>{t("your_wallet")}</th>
                <th>{t("referred_wallet")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>{props.walletaddress}</td>
                <td>
                  {props.referCode === "0x0000000000000000000000"
                    ? "No one Has Referred You"
                    : props.referCode}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Col>
  );
}
