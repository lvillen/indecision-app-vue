import { shallowMount } from "@vue/test-utils";
import Indecision from '@/components/Indecision';

describe('Indecision Component', () => {
  let wrapper;
  let consoleLogSpy;

  global.fetch = jest.fn( () => Promise.resolve({
    json: () => Promise.resolve({
        'answer': 'yes',
        'forced': false,
        'image': 'https://yesno.wtf/assets/yes/2.gif'
      })
    }) 
  ); //Cleaning the error of node not having fetch and mocking our call to the YesNo API

  beforeEach(() => {
    wrapper = shallowMount(Indecision)
    consoleLogSpy = jest.spyOn( console, 'log');

    jest.clearAllMocks(); //Clear the data from the mocks used in each test.
  });

  test('Should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Should not call to getAnswer function when writing (console.log)', async() => {
    const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' ); //TODO: Refactor
    
    const input = wrapper.find('input');
    await input.setValue('Hello world');

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });
  
  test('Should call to getAnswer function when writing a question mark "?"', async() => {
    const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer'); //TODO: Refactor

    const input = wrapper.find('input');
    await input.setValue('Have getAnswer been called?');

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(getAnswerSpy).toHaveBeenCalled();
  });

  test('Testing getAnswer calling fetch', async() => {
    await wrapper.vm.getAnswer();

    const img = wrapper.find('img');

    expect(img.exists()).toBeTruthy();
    expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif');
    expect(wrapper.vm.answer).toBe('yes');

  });

  test('Testing getAnswer — API fails', async() => {
    fetch.mockImplementationOnce( () => Promise.reject('API down'));

    await wrapper.vm.getAnswer();

    const img = wrapper.find('img');

    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe('Could not load from the API');
  });
})