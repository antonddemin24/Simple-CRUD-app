import React, { useState, useEffect } from 'react';
import { fetchPreferences, deletePreference, createPreference, updatePreference } from '../services/api';

const Preferences = () => {
    const [preferences, setPreferences] = useState([]);
    const [newPreference, setNewPreference] = useState({
        id: '',
        name: '',
        description: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatePreferenceData, setUpdatePreferenceData] = useState({
        id: '',
        name: '',
        description: ''
    });


    useEffect(() => {
        getPreferences();
    }, []);


    const getPreferences = async () => {
        try {
                const response = await fetchPreferences();
                setPreferences(response.data);
            } catch (error) {
                console.error('There was an error fetching the subscriptions!', error);
            }
        };

    const deletePref = async (id) => {
        try {
            await deletePreference(id);
            getPreferences();
        } catch (error) {
            console.error("There was an error deleting the subscription!", error);
        }
    };

    const handleNewPreferenceChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewPreference(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleUpdatePreferenceChange = (e) => {
        const { name, value, } = e.target;
        setUpdatePreferenceData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddPreference = async () => {
        try {
            await createPreference(newPreference);
            getPreferences();
            setNewPreference({ id: '', name: '', description: '' });
        } catch (error) {
            console.error('Error creating subscription!', error);
        }
    };

    const handleUpdatePreference = async () => {
        try {
            await updatePreference(updatePreferenceData);
            getPreferences();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating subscription!', error);
        }
    };

    const handleEditPreference = (preference) => {
        setUpdatePreferenceData({
            id: preference.id,
            name: preference.name,
            description: preference.description
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1>Preferences</h1>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Update Subscription</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdatePreference(); }}>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={updatePreferenceData.name}
                                    onChange={handleUpdatePreferenceChange}
                                    disabled
                                />
                            </label>
                            <label>
                                Description:
                                <input
                                    type="text"
                                    name="description"
                                    value={updatePreferenceData.description}
                                    onChange={handleUpdatePreferenceChange}
                                />
                            </label>
                            <button type="submit">Update Subscription</button>
                            <button type="button" onClick={handleCloseModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
            <ul>
                {preferences.map(preference => (
                    <li key={preference.id}>
                        {preference.name}: {preference.description}
                        <button onClick={() => deletePref(preference.id)}>Delete</button>
                        <button onClick={() => handleEditPreference(preference)}>Edit</button>
                    </li>
                ))}
            </ul>
            <h2>Add New Preference</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddPreference(); }}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={newPreference.name}
                        onChange={handleNewPreferenceChange}
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={newPreference.description}
                        onChange={handleNewPreferenceChange}
                    />
                </label>
                <button type="submit">Add Subscription</button>
            </form>
        </div>
    );
};

export default Preferences;