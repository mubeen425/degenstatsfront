import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function InviteYourContacts(props) {
  const { t } = useTranslation();
  const state = useSelector((state) => state);
  return (
    <div className="col-xl-12" style={{ height: "100%" }}>
      <div className="card">
        <div className="card-body pb-2">
          <br></br>
          <h1 className="no-border font-w600 fs-60 mt-2">
            {t("invite_your_contacts")}
          </h1>
          <p className="font-w600 fs-60 mt-2">{t(props.inviteDescription)}</p>
          <br></br>
          <div className="row">
            <div className="col-xl-12">
              <div className=" mt-3 row ">
                <div className="col-xl-10">
                  <div className="row">
                    <label>{t(props.referCodeTitle)}</label>
                    <div className="input-group mb-3">
                      <input
                        id="myInput"
                        disabled={true}
                        value={state.auth.auth.walletaddress}
                        style={{ height: 60 }}
                        type="text"
                        className="form-control"
                      />
                      <button
                        onClick={props.copyToClipBoard}
                        className="btn btn-success"
                        type="button">
                        {t("copy_code_button")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviteYourContacts;
