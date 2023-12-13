import React from 'react'
import styles from './EditProfile.module.css'

function EditProfile() {
    return (
        <div className={styles.bigDiv}>
            <h1>Edit Profile</h1>
            <div className={styles.mb3}>
                <label for="exampleFormControlInput1" className={styles.formLabel}>Email address</label>
                <input type="email" className={styles.formControl} id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
                <label for="exampleFormControlTextarea1" className={styles.formLabel}>Example textarea</label>
                <textarea className={styles.formControl} id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
        </div>
    )
}

export default EditProfile