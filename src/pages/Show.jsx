import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from 'react-router-dom'
const Show = (props) => {
    const [person, setPerson] = useState(null)
    const [loading, setLoading] = useState(true)
    // local state (Show)
    // access information about the current url path for browser
    const { id } = useParams()
    const navigate = useNavigate()
    // define some local variables
    const URL = `http://localhost:4000/people/${id}`

    const getPerson = async () => {
        try {
            const response = await fetch(URL)
            const result = await response.json()
            setPerson(result)
            setLoading(false)

        } catch (err) {
            console.log(err)
        }
    }
    // make a fetch
    const removePerson = async (e)=>{
        try{
            // configure our delete request
            const options = {
                method: "DELETE"
            }
            // make a fetch (delete)
            const response = await fetch(URL, options)
            const deletedPerson = await response.json()
            // await response / parse response
            console.log(deletedPerson)

            // navigate() -> change the current page the browser is at / client side redirect
            navigate("/")
        } catch(err){
            console.log(err)
            // stretch - populate an error on your page - when a delete fails
            // populate some state (3 seconds)
            // redirect to a 404 page (client)
        }
    }
    const loaded = () => (
        <div className="person">
            <h1>Show Page</h1>
            <h2>{person.name||"Not given name"}</h2>
            <div>
                <p>Delete Person</p>
                <button onClick={removePerson}>X</button>
            </div>
            <img src={person.image || "No image available" } alt={person.name + "image"} />
            <h2>{person.title || "No title given"}</h2>
        </div>
    )
    const isLoading = () => {
        <h2>...Loading</h2>
    }   
    useEffect(() => {
        getPerson()
    }, [])
    // confirm + render JSX +++
    // console.log(`current person: ${person?._id || "no person"}`)
    return (
        <section className="Showcontainer">
            {loading ? isLoading() : loaded()}
        </section>
    )
}

export default Show