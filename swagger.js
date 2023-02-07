const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })

const doc = {
    info: {
        title: 'REST Api Kepegawaian',
        description: 'Back-end dari sistem kepegawain PLN.',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    tags: [
        {
            "name": "Login",
            "description": "Login untuk hak akses service"
        },
        // {
        //     "name": "User",
        //     "description": "Api CRUD data user"
        // },
        {
            "name": "Jabatan",
            "description": "Api CRUD data jabatan"
        },
        {
            "name": "Instansi",
            "description": "Crud"
        },
        {
            "name": "Divisi",
            "description": "Crud"
        },
        {
            "name": "Pegawai",
            "description": "Crud data pegawai"
        },
        {
            "name": "Golongan",
            "description": "Crud data"
        },
        {
            "name": "Pendidikan",
            "description": "Crud data pendidikan"
        },
        {
            "name": "Mutasi",
            "description": "Crud data mutasi"
        },
        {
            "name": "Cuti",
            "description": "Crud"
        }
    ],
    securityDefinitions: {
        Token: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    },
    '@definitions': {
        Pegawai: {
            type: 'object',
            properties: {
                nip: {
                    type: 'string',
                },
                nama: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                },
                noTelepon: {
                    type: 'string',
                },
                idTipe: {
                    type: 'string',
                },
                idStatus: {
                    type: 'string',
                },
                idInstansi: {
                    type: 'string',
                },
                idDivisi: {
                    type: 'string',
                },
                idJabatan: {
                    type: 'string',
                },
                idGolongan: {
                    type: 'string',
                },
                uuidUser: {
                    type: 'string',
                }
            }
        },
        AddPegawai: {
            type: 'object',
            properties: {
                nip: {
                    type: 'string',
                },
                nama: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                },
                noTelepon: {
                    type: 'string',
                },
                idTipe: {
                    type: 'string',
                },
                idStatus: {
                    type: 'string',
                },
                idInstansi: {
                    type: 'string',
                },
                idDivisi: {
                    type: 'string',
                },
                idJabatan: {
                    type: 'string',
                },
                idGolongan: {
                    type: 'string',
                },
                uuidUser: {
                    type: 'string',
                }
            },
            required: ['nip', 'nama', 'email', 'noTelepon', 'idTipe', 'idStatus', 'idInstansi', 'idDivisi', 'idJabatan', 'idGolongan', 'uuidUser']
        },
        Golongan: {
            type: 'object',
            properties: {
                id: {
                    type: 'string'
                },
                nama: {
                    type: 'string'
                },
                keterangan: {
                    type: 'string'
                }
            }
        },
        AddGolongan: {
            type: 'object',
            properties: {
                nama: {
                    type: 'string'
                },
                keterangan: {
                    type: 'string'
                }
            }
        },
        Pendidikan: {
            type: 'object',
            properties: {
                id: {
                    type: 'string'
                },
                jenjang: {
                    type: 'string'
                },
                universitas_sekolah: {
                    type: 'string'
                },
                jurusan: {
                    type: 'string'
                },
                tanggal_masuk: {
                    type: 'string'
                },
                tanggal_lulus: {
                    type: 'string'
                },
                gelar: {
                    type: 'string'
                },
                nilai: {
                    type: 'string'
                },
                id_pegawai: {
                    type: 'integer'
                },
            }
        },
        AddPendidikan: {
            type: 'object',
            properties: {
                jenjang: {
                    type: 'string'
                },
                universitas_sekolah: {
                    type: 'string'
                },
                jurusan: {
                    type: 'string'
                },
                tanggal_masuk: {
                    type: 'string'
                },
                tanggal_lulus: {
                    type: 'string'
                },
                gelar: {
                    type: 'string'
                },
                nilai: {
                    type: 'string'
                },
                id_pegawai: {
                    type: 'integer'
                },
            },
            required: ['jenjang', 'universitas_sekolah', 'jurusan', 'tanggal_masuk', 'tanggal_lulus', 'gelar', 'nilai', 'id_pegawai']
        },
        Jabatan: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                },
                nama: {
                    type: 'string',
                }
            },
            required: ['nama']
        },
        AddJabatan: {
            type: 'object',
            properties: {
                nama: {
                    type: 'string',
                },
                idInstansi: {
                    type: 'string',
                },
                idDivisi: {
                    type: 'string'
                }
            },
            required: ['nama']
        },
        Instansi: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                },
                nama: {
                    type: 'string',
                },
                alamat: {
                    type: 'string',
                }
            }
        },
        AddInstansi: {
            type: 'object',
            properties: {
                nama: {
                    type: 'string',
                },
                alamat: {
                    type: 'string',
                }
            }
        },
        Divisi: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                },
                idInstansi: {
                    type: 'integer',
                },
                nama: {
                    type: 'string',
                }
            }
        },
        AddDivisi: {
            type: 'object',
            properties: {
                idInstansi: {
                    type: 'integer',
                },
                nama: {
                    type: 'string',
                }
            }
        },
        Mutasi: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                },
                nipPegawai: {
                    type: 'string',
                },
                detail: {
                    type: 'string',
                },
                jenisMutasi: {
                    type: 'string',
                },
                tanggalMutasi: {
                    type: 'string',
                },
            }
        },
        AddMutasi: {
            type: 'object',
            properties: {
                nipPegawai: {
                    type: 'string',
                },
                detail: {
                    type: 'string',
                },
                jenisMutasi: {
                    type: 'string',
                },
                tanggalMutasi: {
                    type: 'string',
                },
            }
        },
        Cuti: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                },
                keterangan: {
                    type: 'string',
                }, 
                mulaiCuti: {
                    type: 'string',
                }, 
                selesaiCuti: {
                    type: 'string',
                }, 
                diterima: {
                    type: 'string',
                },
                nipPegawai: {
                    type: 'string',
                },
                createdAt: {
                    type: 'string',
                }
            }
        },
        AddCuti: {
            type: 'object',
            properties: {
                keterangan: {
                    type: 'string',
                }, 
                mulaiCuti: {
                    type: 'string',
                }, 
                selesaiCuti: {
                    type: 'string',
                },
                nipPegawai: {
                    type: 'string',
                }
            },
        }
    }
};

const outputFile = 'doc.json'
const endpointsFiles = ['index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)