import { shallowMount, mount } from '@vue/test-utils';
import Counter from '@/components/Counter';

describe('Counter Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter)
  })
  // test('Should match the snapshot', () => {
  //   //Act
  //   const wrapper = shallowMount(Counter);

  //   //Arrange
  //   //No arrange here

  //   //Assert
  //   expect(wrapper.html()).toMatchSnapshot();

  // });
  test('Should render h2 and has "Counter" value', () => {
    //Act
    // const wrapper = shallowMount(Counter);

    //Arrange
    expect(wrapper.find('h2').exists()).toBeTruthy();

    const h2Value = wrapper.find('h2').text();

    //Assert
    expect(h2Value).toBe('Counter')
  });
  
  test('"Counter" value should be 10 at second "p" element', () => {
    //Act
    // const wrapper = shallowMount(Counter);

    //Arrange
    expect(wrapper.find('p').exists()).toBeTruthy;
    // const pTags = wrapper.findAll('p');
    // const secondPTagValue = pTags[1].text();
    const value = wrapper.find('[data-testid="counter"]').text();
    
    //Assert 
    // expect(secondPTagValue).toBe('10');
    expect(value).toBe('10');
  });

  test('Should increase un 1 the "Counter" value and then decrease in 2 the "Counter" value', async() => {
    // const wrapper = shallowMount(Counter);

    const [increaseBtn, decreaseBtn] = wrapper.findAll('button'); //Destructuring

    await increaseBtn.trigger('click');
    await decreaseBtn.trigger('click');
    await decreaseBtn.trigger('click');

    const value = wrapper.find('[data-testid="counter"]').text();

    expect(value).toBe('9');
  });

  test('Should stablish default value', () => {
    //Act 
    //It is done 

    //Arrange
    const { start } = wrapper.props();

    const value = wrapper.find('[data-testid="counter"]').text()

    //Assert
    expect( Number(value) ).toBe(start);

  });

  test('Should show title prop', () => {
    const title = 'Hello world'
    
    //This one needs to be isolated from the other wrappers defined at the beggining of the test-suite
    const wrapper = shallowMount(Counter, {
      props: {
        title //equals to title: title
      }
    }); 
    
    expect( wrapper.find('h2').text()).toBe(title);
  });
});