import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Dropdown, Segment, TextArea } from 'semantic-ui-react';
import { useStore } from '../../../App/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../App/layout/LoadingComponent';
import { Pemantauan } from '../../../App/models/pemantauan';

export default observer(function PemantauanForm() {
    const { pemantauanStore } = useStore();
    const { loadPemantauan, createPemantauan, updatePemantauan, deletePemantauan, loading, loadingInitial } = pemantauanStore;
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [pemantauan, setPemantauan] = useState<Pemantauan>({
        id: '',
        title: '',
        date: '',
        description: '',
    });

    useEffect(() => {
        if (id) loadPemantauan(id).then(p => p && setPemantauan(p));
    }, [id, loadPemantauan]);

    const options = [
        { key: '1', text: 'Penyenggaraan sistem repositori MyGovEA', value: 'Penyenggaraan sistem repositori MyGovEA' },
        { key: '2', text: 'Perolehan pembaharuan lesen iServer', value: 'Perolehan pembaharuan lesen iServer' },
        { key: '3', text: 'Kajian pemantapan sistem repositori MyGovEA', value: 'Kajian pemantapan sistem repositori MyGovEA' },
        { key: '4', text: 'Pengemaskinian profil pengguna iServer', value: 'Pengemaskinian profil pengguna iServer' },
        { key: '5', text: 'Pembentangan di Mesyuarat Penyelarasan Pelaksanaan EA', value: 'Pembentangan di Mesyuarat Penyelarasan Pelaksanaan EA' },
        { key: '6', text: 'Penambahbaikan Panduan Tools dan Repositori MyGovEA', value: 'Penambahbaikan Panduan Tools dan Repositori MyGovEA' },
        { key: '7', text: 'Penyediaan laporan pemantauan penyenggaraan repositori dan portal', value: 'Penyediaan laporan pemantauan penyenggaraan repositori dan portal' },
        { key: '8', text: 'Penyenggaraan portal MyGovEA', value: 'Penyenggaraan portal MyGovEA' },
    ];

    const handleInputChange = (event: any, data: any) => {
        const { name, value } = data || event.target;
        setPemantauan({ ...pemantauan, [name]: value });
    };

    const handleSubmit = async () => {
        if (id) {
            await updatePemantauan(pemantauan);
        } else {
            await createPemantauan(pemantauan);
        }
        navigate('/pemantauan');
    };

    if (loadingInitial) return <LoadingComponent content='Sila tunggu...' />;

    return (
        <Grid centered>
            <Grid.Column width={10}>
                <Segment clearing style={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }}>
                    <Header as="h2" content={id ? 'Kemaskini Pemantauan' : 'Tambah Pemantauan'} color="teal" textAlign="center" style={{ marginBottom: '1.5rem' }} />
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <Form.Field
                            control={Dropdown}
                            label="Tajuk"
                            name="title"
                            selection
                            options={options}
                            value={pemantauan.title}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Input
                            label="Tarikh"
                            name="date"
                            type="date"
                            value={pemantauan.date}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Field
                            control={TextArea}
                            label="Catatan / Penerangan"
                            name="description"
                            placeholder="Masukkan penerangan lanjut..."
                            value={pemantauan.description}
                            onChange={handleInputChange}
                            rows={4}
                        />
                        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <Button
                                loading={loading}
                                primary
                                type="submit"
                                content={id ? "Simpan Perubahan" : "Tambah"}
                                icon="save"
                                style={{ borderRadius: '8px', minWidth: '150px' }}
                            />
                            {id && (
                                <Button
                                    type="button"
                                    basic
                                    color="red"
                                    icon="trash"
                                    content="Padam"
                                    loading={loading}
                                    onClick={() => deletePemantauan(id).then(() => navigate('/pemantauan'))}
                                    style={{ borderRadius: '8px' }}
                                />
                            )}
                            <Button
                                as={Link}
                                to="/pemantauan"
                                basic
                                content="Batal"
                                style={{ borderRadius: '8px' }}
                            />
                        </div>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    );
});
