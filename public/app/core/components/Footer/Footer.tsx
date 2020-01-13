import React, { FC } from 'react';
// import { Tooltip } from '@grafana/ui';

interface Props {
  appName: string;
  buildVersion: string;
  buildCommit: string;
  newGrafanaVersionExists: boolean;
  newGrafanaVersion: string;
}

export const Footer: FC<Props> = React.memo(
  ({ appName, buildVersion, buildCommit, newGrafanaVersionExists, newGrafanaVersion }) => {
    return (
      <footer className="footer">
        <div className="text-center">
          <p>© ABSA, Eléctrica AB, S.A. de C.V., powered by Knesys. 2019</p>
          <p>
            Toda la información, conceptos técnicos e intelectuales contenidos en este documento son propiedad de ABSA.
            Pueden estar cubiertos por patentes extranjeras, patentes en proceso y están protegidos por secreto
            comercial o derecho de autor. La difusión de esta información o la reproducción de este material es
            estrictamente prohibido a menos que se obtenga un permiso previo por escrito de ABSA.
          </p>
          {/* <ul>
            <li>
              <a href="http://docs.grafana.org" target="_blank" rel="noopener">
                <i className="fa fa-file-code-o" /> Docs
              </a>
            </li>
            <li>
              <a
                href="https://grafana.com/products/enterprise/?utm_source=grafana_footer"
                target="_blank"
                rel="noopener"
              >
                <i className="fa fa-support" /> Support & Enterprise
              </a>
            </li>
            <li>
              <a href="https://community.grafana.com/" target="_blank" rel="noopener">
                <i className="fa fa-comments-o" /> Community
              </a>
            </li>
            <li>
              <a href="https://grafana.com" target="_blank" rel="noopener">
                {appName}
              </a>{' '}
              <span>
                v{buildVersion} (commit: {buildCommit})
              </span>
            </li>
            {newGrafanaVersionExists && (
              <li>
                <Tooltip placement="auto" content={newGrafanaVersion}>
                  <a href="https://grafana.com/get" target="_blank" rel="noopener">
                    New version available!
                  </a>
                </Tooltip>
              </li>
            )}
          </ul> */}
        </div>
      </footer>
    );
  }
);

export default Footer;
