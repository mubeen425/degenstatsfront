import { Card, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function RefersLevel(props) {
  const { t } = useTranslation();
  return (
    <Col lg={12}>
      <Card>
        <Card.Header>
          <Card.Title>{t("refers_by_level")}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row className="text-center" lg={4}>
            <Col lg={4}>
              <Card.Title>{t("level_1")}</Card.Title>
            </Col>
            <Col lg={4}>
              <Card.Title>{t("level_2")}</Card.Title>
            </Col>
            <Col lg={4}>
              <Card.Title>{t("level_3")}</Card.Title>
            </Col>
          </Row>

          <Row className="text-center " lg={4}>
            <Col lg={4}>{props.level1count}</Col>
            <Col lg={4}>{props.level2count}</Col>
            <Col lg={4}>{props.level3count}</Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default RefersLevel;
