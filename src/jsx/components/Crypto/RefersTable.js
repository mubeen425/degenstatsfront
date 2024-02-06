import { Card, Col, Table, Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function RefersTable(props) {
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
                <th>{t("level")}</th>
                <th>{t("date")}</th>
                <th>MEME</th>
              </tr>
            </thead>
            <tbody>
              {props.stakingReferalData.map((item, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{item.wallet_address}</td>
                    <td>
                      {" "}
                      <Badge bg="" className={"badge-success success"}>
                        {t("level")} {item.level}
                      </Badge>{" "}
                    </td>
                    <td>{getFormattedDate(item.createdAt)}</td>
                    <td className="color-primary">{item.reward} BXG</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default RefersTable;
