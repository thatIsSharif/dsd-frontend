import timelineContext from 'context/timeline/timelineContext';

import {RenderOptions, render, screen} from '@testing-library/react';
import TimeLineContextProps from 'context/timeline/timelineProps/timeline.type';
import {Dispatch, SetStateAction} from 'react';
import Timeline from './Timeline';

const mockTimelineProps: TimeLineContextProps = {
  steps: ['Select Driver', 'Assigned Stock', 'Activation'],
  orderRoutes: [],
  currentStep: 2,
  setCurrentStep: jest.fn() as Dispatch<SetStateAction<number>>,
  increaseSteps: jest.fn(),
  decreaseSteps: jest.fn(),
  rememberSteps: jest.fn(),
  updateStepsArray: jest.fn(),
  updateOrderRoutes: jest.fn(),
};

interface ProviderProps {
  providerProps: TimeLineContextProps;
}

const renderWithContext = (
  ui: React.ReactElement,
  {providerProps, ...renderOptions}: ProviderProps & RenderOptions,
) => {
  return render(
    <timelineContext.Provider value={providerProps}>
      {ui}
    </timelineContext.Provider>,
    renderOptions,
  );
};

describe('timeline tests', () => {
  beforeEach(() => {
    renderWithContext(<Timeline />, {
      providerProps: mockTimelineProps,
    });
  });

  test('calls rememberStep function onMount', () => {
    expect(mockTimelineProps.rememberSteps).toHaveBeenCalledTimes(1);
  });

  test('render all timeline steps', () => {
    mockTimelineProps.steps.forEach((step, index) => {
      expect(screen.queryAllByText(` ${index + 1}.  ${step}`));
    });
  });

  test('steps marked as completed, active, or pending', () => {
    const {container} = renderWithContext(<Timeline />, {
      providerProps: mockTimelineProps,
    });
    const circles = container.querySelectorAll('.step-circle');
    expect(circles[0]).toHaveClass('completed');
    expect(circles[1]).toHaveClass('active');
    expect(circles[2]).toHaveClass('pending');
  });

  test('checks if .step-circle is present in each .step', () => {
    const {container} = renderWithContext(<Timeline />, {
      providerProps: mockTimelineProps,
    });
    const stepElements = container.querySelectorAll('[data-testid="step"]');

    stepElements.forEach((step) => {
      expect(step.querySelector('.step-circle')).toBeInTheDocument();
    });
  });
});
