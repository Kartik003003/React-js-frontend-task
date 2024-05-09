import React from 'react';

function App() {
  const [data, setData] = React.useState([
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 }
  ]);

  const handleEdit = (id, field, value) => {
    setData(data.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const prepareDataForAPI = () => {
    return data.map(item => ({
      id: item.id,
      name: item.name,
      age: item.age
    }));
  };

  const handlePostToAPI = () => {
    const dataToPost = prepareDataForAPI();
    
    fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToPost)
    })
      .then(response => {
       
        console.log('Data posted successfully');
      })
      .catch(error => {
        
        console.error('Error posting data:', error);
      });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td contentEditable onBlur={(e) => handleEdit(item.id, 'name', e.target.innerText)}>{item.name}</td>
              <td contentEditable onBlur={(e) => handleEdit(item.id, 'age', e.target.innerText)}>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePostToAPI}>Post to API</button>
    </div>
  );
}

export default App;