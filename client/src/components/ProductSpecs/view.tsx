import React from 'react';
import { ICharacteristics } from '../../model/types/IProducts';
import { useTranslation } from 'react-i18next';

import style from './style.module.scss';

interface IProps {
  specs: ICharacteristics;
}

export const ProductSpecs: React.FC<IProps> = (props) => {
  const {
    connection,
    screen,
    cpu,
    memory,
    camera,
    os,
    dimensions,
    // battery,
    // frame,
    // interfacesAndConnections,
    // wirelessTechnologies,
  } = props.specs;

  const { t } = useTranslation(['products']);

  return (
    <div className={style.productSpecs}>
      <h3 className={style.productSpecsTitle}>
        {t('specs')}
      </h3>
      {connection && <table>
        <thead>
          {connection.numOfSimCards && <tr>
            <td className={style.productSpecsHead}>{t('connection')}</td>
          </tr>}
        </thead>
        <tbody className={style.productSpecsBody}>
          {connection.numOfSimCards && <tr>
            <td className={style.productSpecsCell}>
              {t('numOfSims')}
            </td>
            <td className={style.productSpecsCell}>
              {connection.numOfSimCards}
            </td>
          </tr>}
          {Boolean(connection.simCardsFormat?.length) && <tr>
            <td className={style.productSpecsCell}>
              {t('simFormat')}
            </td>
            <td className={style.productSpecsCell}>
              {connection?.simCardsFormat?.map((el: string) => el + ' ')}
            </td>
          </tr>}
          {Boolean(connection.communicationStandards?.length) && <tr>
            <td className={style.productSpecsCell}>
              {t('standarts')}
            </td>
            <td className={style.productSpecsCell}>
              {connection?.communicationStandards?.map(
                (el: string) => el + ' '
              )}
            </td>
          </tr>}
        </tbody>
      </table>}

      {screen && <table>
        <thead>
          <tr>
            <td className={style.productSpecsHead}>{t('screen')}</td>
          </tr>
        </thead>
        <tbody className={style.productSpecsBody}>
          {screen.diagonal && <tr>
            <td className={style.productSpecsCell}>
              {t('diagonal')}
            </td>
            <td className={style.productSpecsCell}>
              {screen.diagonal}
            </td>
          </tr>}
          {screen.resolution && <tr>
            <td className={style.productSpecsCell}>
              {t('resolution')}
            </td>
            <td className={style.productSpecsCell}>
              {screen.resolution}
            </td>
          </tr>}
          {screen.refreshRate && <tr>
            <td className={style.productSpecsCell}>
              {t('refreshRate')}
            </td>
            <td className={style.productSpecsCell}>
              {screen.refreshRate}
            </td>
          </tr>}
          {screen.pixelDensity && <tr>
            <td className={style.productSpecsCell}>
              {t('pixelDensity')}
            </td>
            <td className={style.productSpecsCell}>
              {screen.pixelDensity} ppi
            </td>
          </tr>}
          {screen.type && <tr>
            <td className={style.productSpecsCell}>
              {t('screenType')}
            </td>
            <td className={style.productSpecsCell}>
              {screen.type}
            </td>
          </tr>}
        </tbody>
      </table>}

      {cpu && <table>
        <thead>
          <tr>
            <td className={style.productSpecsHead}>{t('processor')}</td>
          </tr>
        </thead>
        <tbody className={style.productSpecsBody}>
          {cpu.name && <tr>
            <td className={style.productSpecsCell}>
              {t('processor')}
            </td>
            <td className={style.productSpecsCell}>
              {cpu.name}
            </td>
          </tr>}
          {cpu.coresNum && <tr>
            <td className={style.productSpecsCell}>
              {t('numOfCores')}
            </td>
            <td className={style.productSpecsCell}>
              {cpu.coresNum}
            </td>
          </tr>}
          {cpu.gpu && <tr>
            <td className={style.productSpecsCell}>
              {t('gpu')}
            </td>
            <td className={style.productSpecsCell}>
              {cpu.gpu}
            </td>
          </tr>}
          {cpu.videoMemory && <tr>
            <td className={style.productSpecsCell}>
              {t('videoMemory')}
            </td>
            <td className={style.productSpecsCell}>
              {cpu.videoMemory}
            </td>
          </tr>}
        </tbody>
      </table>}

      {memory && <table>
        <thead>
          <tr>
            <td className={style.productSpecsHead}>{t('memory')}</td>
          </tr>
        </thead>
        <tbody className={style.productSpecsBody}>
          {memory.internalMemory && <tr>
            <td className={style.productSpecsCell}>
              {t('internalMemory')}
            </td>
            <td className={style.productSpecsCell}>
              {memory.internalMemory}
            </td>
          </tr>}
          {memory.ram && <tr>
            <td className={style.productSpecsCell}>
              {t('ram')}
            </td>
            <td className={style.productSpecsCell}>
              {memory.ram}
            </td>
          </tr>}
          {memory.type && <tr>
            <td className={style.productSpecsCell}>
              {t('typeMemory')}
            </td>
            <td className={style.productSpecsCell}>
              {memory.type}
            </td>
          </tr>}
        </tbody>
      </table>}

      {camera && <table>
        <thead>
          <tr>
            <td className={style.productSpecsHead}>{t('camera')}</td>
          </tr>
        </thead>
        <tbody className={style.productSpecsBody}>
          {camera.camera && <tr>
            <td className={style.productSpecsCell}>
              {t('camera')}
            </td>
            <td className={style.productSpecsCell}>
              {camera.camera}
            </td>
          </tr>}
          {camera.videoRecording && <tr>
            <td className={style.productSpecsCell}>
              {t('video')}
            </td>
            <td className={style.productSpecsCell}>
              {camera.videoRecording}
            </td>
          </tr>}
          {camera.frontCamera && <tr>
            <td className={style.productSpecsCell}>
              {t('frontCamera')}
            </td>
            <td className={style.productSpecsCell}>
              {camera.frontCamera}
            </td>
          </tr>}
          {camera.opticalStabilization && <tr>
            <td className={style.productSpecsCell}>
              {t('opticalStab')}
            </td>
            <td className={style.productSpecsCell}>
              {t(camera.opticalStabilization)}
            </td>
          </tr>}
        </tbody>
      </table>}

      {os && <table>
        <thead>
          <tr>
            <td className={style.productSpecsHead}>{t('os')}</td>
          </tr>
        </thead>
        <tbody className={style.productSpecsBody}>
          <tr>
            <td className={style.productSpecsCell}>
              {t('os')}
            </td>
            <td className={style.productSpecsCell}>
              {os}
            </td>
          </tr>
        </tbody>
      </table>}

      {dimensions && <table>
        <thead>
          <tr>
            <td className={style.productSpecsHead}>{t('dimensions')}</td>
          </tr>
        </thead>
        <tbody className={style.productSpecsBody}>
          {dimensions.dimensions && <tr>
            <td className={style.productSpecsCell}>
              {t('dimensions')}
            </td>
            <td className={style.productSpecsCell}>
              {dimensions.dimensions}
            </td>
          </tr>}
          {dimensions.weight && <tr>
            <td className={style.productSpecsCell}>
              {t('weight')}
            </td>
            <td className={style.productSpecsCell}>
              {dimensions.weight}
            </td>
          </tr>}
        </tbody>
      </table>}
    </div>
  );
};
