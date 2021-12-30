import { fireEvent, render, screen, within } from '@testing-library/react';
import Home from './Home';

const setup = () => {
  const utils = render(<Home />);
  const headingElement = screen.getByText(/Choose Your Delivery Slot/i);
  const dateInputElement = screen.getByLabelText(/Delivery Date/i);
  return {
    headingElement,
    dateInputElement,
    ...utils,
  }
};

describe('Delivery Page Tests', () => {

  test('Should render Title & Delivery Date Input on Initial Load', () => {
    const { headingElement, dateInputElement } = setup();
    expect(headingElement).toBeInTheDocument();
    expect(dateInputElement).toBeInTheDocument();
  });


  test('Given Monday with 3 Orders at 12:30 and 4 Orders at 18:30, Should render 10:30 and 12:30 as available Delivery Times', async () => {
    const { dateInputElement } = setup();

    fireEvent.change(dateInputElement, { target: { value: '2022-01-03' } });
    expect(dateInputElement).toHaveValue('2022-01-03');

    const RadioGroupTitleElement = await screen.findByText(/Delivery Time/i);
    expect(RadioGroupTitleElement).toBeInTheDocument();

    const RadioInputElements = await screen.findAllByTestId(/radio-input-label/i);
    expect(RadioInputElements).toHaveLength(2);
    expect(RadioInputElements[0]).toHaveTextContent(/10:30/i);
    expect(RadioInputElements[1]).toHaveTextContent(/12:30/i);
  });


  test('Given Tuesday with 2 Orders at 10:30, Should render 12:30 and 18:30 as available Delivery Times', async () => {
    const { dateInputElement } = setup();

    fireEvent.change(dateInputElement, { target: { value: '2022-01-04' } });
    expect(dateInputElement).toHaveValue('2022-01-04');

    const RadioGroupTitleElement = await screen.findByText(/Delivery Time/i);
    expect(RadioGroupTitleElement).toBeInTheDocument();

    const RadioInputElements = await screen.findAllByTestId(/radio-input-label/i);
    expect(RadioInputElements).toHaveLength(2);
    expect(RadioInputElements[0]).toHaveTextContent(/12:30/i);
    expect(RadioInputElements[1]).toHaveTextContent(/18:30/i);
  });


  test('Given Wednesday with 2 Orders at 10:30 and 2 Orders at 12:30, Should render 18:30 as available Delivery Time', async () => {
    const { dateInputElement } = setup();

    fireEvent.change(dateInputElement, { target: { value: '2022-01-05' } });
    expect(dateInputElement).toHaveValue('2022-01-05');

    const RadioGroupTitleElement = await screen.findByText(/Delivery Time/i);
    expect(RadioGroupTitleElement).toBeInTheDocument();

    const RadioInputElements = await screen.findAllByTestId(/radio-input-label/i);
    expect(RadioInputElements).toHaveLength(1);
    expect(RadioInputElements[0]).toHaveTextContent(/18:30/i);
  });


  test('Given Thursday with 2 Orders at 12:30, Should render 10:30 and 18:30 as available Delivery Times', async () => {

    const { dateInputElement } = setup();

    fireEvent.change(dateInputElement, { target: { value: '2022-01-06' } });
    expect(dateInputElement).toHaveValue('2022-01-06');

    const RadioGroupTitleElement = await screen.findByText(/Delivery Time/i);
    expect(RadioGroupTitleElement).toBeInTheDocument();

    const RadioInputElements = await screen.findAllByTestId(/radio-input-label/i);
    expect(RadioInputElements).toHaveLength(2);
    expect(RadioInputElements[0]).toHaveTextContent(/10:30/i);
    expect(RadioInputElements[1]).toHaveTextContent(/18:30/i);
  });


  test('Given Friday with 2 Orders each at 10:30, 12:30 and 18:30, Should not render any available Delivery Times', () => {
    const { dateInputElement } = setup();

    fireEvent.change(dateInputElement, { target: { value: '2022-01-07' } });
    expect(dateInputElement).toHaveValue('2022-01-07');

    const RadioGroupTitleElement = screen.queryByText(/Delivery Time/i);
    expect(RadioGroupTitleElement).not.toBeInTheDocument();

    const RadioInputElements = screen.queryAllByTestId(/radio-input-label/i);
    expect(RadioInputElements).toHaveLength(0);
  });


  test('Given Saturday with 2 Orders at 18:30, Should render 10:30 and 12:30 as available Delivery Times', async () => {
    const { dateInputElement } = setup();

    fireEvent.change(dateInputElement, { target: { value: '2022-01-08' } });
    expect(dateInputElement).toHaveValue('2022-01-08');

    const RadioGroupTitleElement = await screen.findByText(/Delivery Time/i);
    expect(RadioGroupTitleElement).toBeInTheDocument();

    const RadioInputElements = await screen.findAllByTestId(/radio-input-label/i);
    expect(RadioInputElements).toHaveLength(2);
    expect(RadioInputElements[0]).toHaveTextContent(/10:30/i);
    expect(RadioInputElements[1]).toHaveTextContent(/12:30/i);
  });


  test('Given Sunday with no Orders, Should render 10:30, 12:30 and 18:30 as available Delivery Times', async () => {
    const { dateInputElement } = setup();

    fireEvent.change(dateInputElement, { target: { value: '2022-01-09' } });
    expect(dateInputElement).toHaveValue('2022-01-09');

    const RadioGroupTitleElement = await screen.findByText(/Delivery Time/i);
    expect(RadioGroupTitleElement).toBeInTheDocument();

    const RadioInputElements = await screen.findAllByTestId(/radio-input-label/i);
    expect(RadioInputElements).toHaveLength(3);
    expect(RadioInputElements[0]).toHaveTextContent(/10:30/i);
    expect(RadioInputElements[1]).toHaveTextContent(/12:30/i);
    expect(RadioInputElements[2]).toHaveTextContent(/18:30/i);
  });


  test('Should render a Warning Message when Delivery Times are not Available', async () => {
    const { dateInputElement } = setup();

    fireEvent.change(dateInputElement, { target: { value: '2022-01-07' } });
    expect(dateInputElement).toHaveValue('2022-01-07');

    const RadioGroupWarningMessageElement = await screen.findByText('Sorry! no Delivery Slots are available on 07-01-2022');
    expect(RadioGroupWarningMessageElement).toBeInTheDocument();
  });


  test('Should render a Confimation Message when a Delivery Time is Chosen', async () => {
    const { dateInputElement } = setup();

    fireEvent.change(dateInputElement, { target: { value: '2022-01-09' } });
    expect(dateInputElement).toHaveValue('2022-01-09');

    const RadioElement1 = await screen.findByLabelText(/10:30/i);
    fireEvent.click(RadioElement1);
    const RadioGroupConfirmationMessageElement1 = await screen.findByText('Your Order will be delivered on 09-01-2022 at 10:30');
    expect(RadioGroupConfirmationMessageElement1).toBeInTheDocument();

    const RadioElement2 = await screen.findByLabelText(/18:30/i);
    fireEvent.click(RadioElement2);
    const RadioGroupConfirmationMessageElement2 = await screen.findByText('Your Order will be delivered on 09-01-2022 at 18:30');
    expect(RadioGroupConfirmationMessageElement2).toBeInTheDocument();
  });

});
