import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Tutor {
    name: string;
    image: string;
    style: string;
    exp: string;
    disipline: number;
}

function createData(
    name: string,
    image: string,
    style: string,
    exp: string,
    disipline: number
): Tutor {
    return { name, image, style, exp, disipline };
}

const rows = [
    createData(
        'Adrian Bui',
        "https://s3-alpha-sig.figma.com/img/6181/1ae8/89b0660d6dd91bdedba586139a98a0fe?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dcar9Uyk96l2jpeTh2G6LaJt7V5gXJFk7gwxFXMec4JELFGSF8WvJm7gj~KmJh0u24qRFGSeo9qzVKVjNjfGK9V1R~6X8MclhaxavpFdUrxZUx7EAcibCZyMarwVSpLE5NtAOTFoFNsoHNUT~rm15LQuIQ2IDkHX9CQMCmmc~JltROwYdkvxWuffL6-I3TRyMVMZvq92cxBOlaVaMJorSIlqcSSnZOmk6L6PT3FfjrP19PRTh9S38DxgXq641FaK-gJSw-hFc2-min3OEZS9kYtIivRU1QH6rnGcZ~3M8AAyhoBXrtVQIgXBu0-k1OGeOIk4LgNqEP1PGp9ZPPc8rw__",
        "1200$",
        "Digital Marketing",
        80),
    createData(
        'Mary Han',
        "https://s3-alpha-sig.figma.com/img/ebc8/a27e/c8984d41c8d22ee5e1e8af38f1f4da8f?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JAH8eY24Gv~kbGclnARIWS0oLf-1tlpzrTXQZ9uvaQMV2sq6RRP61zDRWNwSLUE-A11AdcTgy3BQAKEmEmG-VZ49RrPk8HCz6Hj2FlLyTgrW0nfFoGNh5swFTofOn3fVJsyvdcn86RKaKhDyBzt1EVOIGV60y2cWSdLqFuhaOJfRoP9Kw5EJevVQmrHZxqQ9Cj7a4bzKqIx3Ih931YFnbftvYVorDYbgs3h55TPHx8T2SztYNnG~xbNOR3Fi1zIaLo7u94WQDoL2DtvrJwLTBXLgnDUeTnKf7qiQUu6vT3mEx29H40ZjAxSlKgYyxlIdpfZBT3hRF9q0uMmAWssf3Q__",
        "900$",
        "International Business",
        72),
    createData(
        'Dino Phi',
        "https://s3-alpha-sig.figma.com/img/f1fd/d656/07eef0d4abb2a99c5ad961bcffc81c5f?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DcmWE0ZteAh6chYldsatebsDACUBGOVxHuEJgfizFf4y2dfg5yZZP8bMGSRniIce3yIYjHbjsxfDRd-tIV6SOhST5jK9BTZl0RDimGWp6mE0UhyxVtI7W1o9WulaYK4Ei8xl-OBRgxYFSO-OK8qmj9BQmxOlK-xURrONm19cDfWYxyZ7t36qMmspJltIy1J8vMHptYmrxQfdI7CMoeDaOpBlwhjRjA9pQ8sOnyhGYnwCSa78~absnhWUt71onxabTlIRBV39fT3IBPePLv6EdjY7-U~TNz3~Yb1Da85VutnwJvRxJ9MYO4J9jpFiP32N3UCIBGobfvtsGLDeOPxMdA__",
        "700$",
        "Software Engineering",
        64),
];


export default function StudioStatus() {
    console.log('test');

    return (
        <div>
            <h3 style={{ textAlign: "left", padding: "5px 10px", fontFamily: "Belanosima", fontSize: "25px", backgroundColor: "#fcfcfc" }}>Top 3 Best Tutors of Year</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontFamily: "Belanosima", fontSize: "18px" }}>Name</TableCell>
                            <TableCell style={{ fontFamily: "Belanosima", fontSize: "18px" }} align="center">Revenue</TableCell>
                            <TableCell style={{ fontFamily: "Belanosima", fontSize: "18px" }} align="center">Major</TableCell>
                            <TableCell style={{ fontFamily: "Belanosima", fontSize: "18px" }} align="center">Number of classes</TableCell>
                            <TableCell style={{ fontFamily: "Belanosima", fontSize: "18px" }} align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                style={{ textAlign: "center" }}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell align="left" style={{ display: "flex", alignItems: "center", fontFamily: "Belanosima", fontSize: "16px" }}>
                                    <img
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%",
                                            marginRight: "20px",
                                            objectFit: "contain"
                                        }}
                                        src={row.image} />
                                    {
                                        row.name
                                    }

                                </TableCell>
                                <TableCell style={{ fontFamily: "Belanosima", fontSize: "16px" }} align="center">{row.style}</TableCell>
                                <TableCell style={{ fontFamily: "Belanosima", fontSize: "16px" }} align="center">{row.exp}</TableCell>
                                <TableCell style={{ fontFamily: "Belanosima", fontSize: "16px" }} align="center">{row.disipline}</TableCell>
                                <TableCell style={{ fontFamily: "Belanosima", fontSize: "16px" }} align="center">Available</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )
}
