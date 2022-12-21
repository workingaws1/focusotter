import logo from './logo.svg';
import './App.css';
import "@aws-amplify/ui-react/styles.css";
// import Amplify, {API} from 'aws-amplify'
import config from './aws-exports';
import { Button, withAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

// Amplify.configure(config);

const App = ({signOut}) => {

  const [petName, setPetName] = useState('')
  const [petType, setPetType] = useState('')
  const [pets, setPets] = useState([])

  useEffect (() => {
    API.get('petsname', '/pets/name').then(
      (res) => {setPets([ ...res])}
    )
    console.log(pets)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    API.post('petsname', '/pets', {
      body: {
        name: petName,
        type: petType,
      }
    }
    ).then(() => {
      setPets([...pets, {name: petName, type: petType}])
    })
  }

  return (
    <div>
      happy coding!
    <form onSubmit={handleSubmit}>
      <input value={petName} placeholder="fiddo" onChange={(e) => setPetName(e.target.value)}/>
      <input value={petType} placeholder="fiddo" onChange={(e) => setPetType(e.target.value)}/>
      <button> Submit! </button>
    </form>
    <ul>
      {pets.map(pet => <li> {pet.name}</li>)}
    </ul>
    <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}

export default withAuthenticator(App);