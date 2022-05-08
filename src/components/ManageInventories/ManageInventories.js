import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import useBooks from '../../hooks/useBooks';
import Item from '../Item/Item';
import { confirmAlert } from '@ergisgjergji/react-confirm-alert';
import '@ergisgjergji/react-confirm-alert/src/react-confirm-alert.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const ManageInventories = () => {
    const [books] = useBooks();

    // delete button
    const handleDeleteItem = (id, name) => {
        confirmAlert({
            message: 'Are you sure you want to delete it?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {

                        // send updated data to server
                        const url = `http://localhost:5000/inventory/${id}`;
                        fetch(url, {
                            method: 'DELETE'
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.deletedCount > 0) {
                                    toast.success(`${name} deleted.`);
                                }
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return;
                    }
                }
            ]
        });
    }
    return (
        <Container className='my-5'>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className='text-center'>Price</th>
                        <th className='text-center'>Quantity</th>
                        <th className='text-center'>Sold</th>
                        <th>Supplier</th>
                        <th className='text-center'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map(book =>
                            <Item
                                key={book._id}
                                book={book}
                                handleDeleteItem={handleDeleteItem}
                            ></Item>
                        )
                    }
                </tbody>
            </Table>
            <div className='d-flex justify-content-center pt-4'>
                <Link to='/inventory/add-book' >
                    <Button className='border-0 py-2 px-4 rounded-3 fw-bold f-merriweather secondary-bg button'>Add New Item</Button>
                </Link>
            </div>
            <ToastContainer />
        </Container>
    );
};

export default ManageInventories;