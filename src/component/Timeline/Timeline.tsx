import timelineContext from 'context/timeline/timelineContext';
import {Fragment, useContext, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import './Timeline.scss';

function Timeline() {
  const {t} = useTranslation();
  const {currentStep, steps, rememberSteps} = useContext(timelineContext);

  useEffect(() => {
    rememberSteps();
  }, []);

  return (
    <div data-testid={'timeline'} className="container-timeline-outer">
      <div className="container-timeline">
        {steps?.map((step, i) => (
          <Fragment key={i}>
            <div className={'step-item'}>
              <div data-testid="step" className="step">
                {i + 1 < currentStep ? (
                  <div className="step-circle completed">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none">
                      <path
                        d="M13.3334 4L5.99998 11.3333L2.66665 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : i + 1 === currentStep ? (
                  <div className="step-circle active">
                    <span>{i + 1}</span>
                  </div>
                ) : (
                  <div className="step-circle pending">
                    <span>{i + 1}</span>
                  </div>
                )}
              </div>

              <div className="steps-wrapper">
                <div className="steps">
                  <p>{` ${i + 1}.  ${t(step)}`}</p>
                </div>
                <div
                  className={`step-indicator ${
                    i + 1 < currentStep
                      ? 'completed'
                      : i + 1 === currentStep
                        ? 'in-progress'
                        : 'pending'
                  }`}>
                  <span>
                    {i + 1 < currentStep
                      ? t('timeline.completed')
                      : i + 1 === currentStep
                        ? t('timeline.inProgress')
                        : t('timeline.pending')}
                  </span>
                </div>
              </div>
            </div>
            {i + 1 < steps.length && (
              <div
                className={`timeline-hr ${
                  i + 1 < currentStep
                    ? 'completed'
                    : i + 1 === currentStep
                      ? 'in-progress'
                      : 'pending'
                }`}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default Timeline;

