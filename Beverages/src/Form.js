import React from 'react';
import { useGlobalContext } from './context';

function Form() {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = React.useRef('');

  React.useEffect(() => {
    searchValue.current.focus();
  }, []);

  function searchBeverage() {
    setSearchTerm(searchValue.current.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>Search your Favorite Beverages </label>
          <input
            type='text'
            name='name'
            id='name'
            ref={searchValue}
            onChange={searchBeverage}
          />
        </div>
      </form>
    </section>
  );
}

export default Form;