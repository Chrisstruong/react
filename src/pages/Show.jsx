import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const placeholderImage = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"

const Show = (props) => {
    // local state (Show)
    const [person, setPerson] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editForm, setEditForm] = useState("")
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

    const removePerson = async (e) => {
        try {

            // configure our delete request
            const options = {
                method: "DELETE"
            }
            const response = await fetch(URL, options)
            const deletedPerson = await response.json()

            // make a fetch (delete)
            console.log(deletedPerson)
            // await response / parse response 
            // navigate() -> change the current page the browser is at / client side redirect
        } catch (err) {
            console.log(err)
            // stretch - populate an error on your page - when a delete fails
            // populate some state (3 seconds)
            // redirect to a 404 page (client)
        }
    }

    const updatedPerson = async (e) => {
        e.preventDefault()
        try {
            const update = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editForm),
            }
            const response = await fetch(URL, update)
            const personGetUpdated = await response.json()
            setPerson(personGetUpdated)
            setEditForm(personGetUpdated)
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    const isLoading = () => (<h2>....Loading</h2>)
    const loaded = () => (
        <>
            <div className="person-card">
                {/* React optimization / difference */}
                <h1>{person.name}</h1>
                <div>
                    <p>Delete Person</p>
                    <Link to={'/'}>
                    <button onClick={removePerson}> X </button>
                    </Link>
                </div>
                <img src={person.image || placeholderImage} />
                <h3>{person.title || "Not title given"}</h3>
            </div>

            <section>
                <h2>Edit this Person</h2>
                <form onSubmit={updatedPerson}>
                    <input
                        type="text"
                        value={editForm.name}
                        name="name"
                        placeholder="name"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        value={editForm.image}
                        name="image"
                        placeholder="image URL"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        value={editForm.title}
                        name="title"
                        placeholder="title"
                        onChange={handleChange}
                    />
                    <input type="submit" value="Update Person" />
                </form>
            </section>


            <Link to="/">Back to Home</Link>
        </>
    )
    useEffect(() => { getPerson() }, [])
    // confirm + render JSX +++
    // console.log(`current person: ${person?._id || "no person"}`)
    return (
        <>
            <section className="ShowContainer">

                {loading ? isLoading() : loaded()}

            </section>

        </>

    )
}

export default Show