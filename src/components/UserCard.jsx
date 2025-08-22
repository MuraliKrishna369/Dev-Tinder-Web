const UserCard = ({user}) => {
    const {firstName, lastName, photoUrl, age, gender, about} = user
    return (
        <div className="card bg-base-300 max-w-72 shadow-sm">
            <figure>
                <img
                src={photoUrl}
                alt="user-image" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>
                    {age &&<span>{age}</span>}
                    {gender && <span>{" " + gender}</span>}
                    
                </p>
                <p>{about}</p>
                <div className="flex justify-around my-5">
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-secondary">Intrested</button>
                </div>
            </div>
        </div>
    )
}
export default UserCard