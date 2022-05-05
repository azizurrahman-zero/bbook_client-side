import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useBooks from '../../hooks/useBooks';
import Banner from '../Banner/Banner';
import Book from '../Book/Book';

const Home = () => {
    const [books] = useBooks();
    return (
        <Container>
            <Banner></Banner>
            <section className='my-5'>
                <h3 className='fs-1 text-center fw-bold mb-4 primary-color f-merriweather'>Inventory</h3>
                <Row xs={1} md={3} className="g-4 mb-4">
                    {
                        books.map(book =>
                            <Book
                                key={book._id}
                                book={book}
                            ></Book>
                        )
                    }
                </Row>
                <div className='d-flex justify-content-center pt-4'>
                    <Link to='/manage-inventories' >
                        <Button className='border-0 py-2 px-4 rounded-3 fw-bold f-merriweather secondary-bg button'>Manage Inventories</Button>
                    </Link>
                </div>
            </section>
        </Container>
    );
};

export default Home;