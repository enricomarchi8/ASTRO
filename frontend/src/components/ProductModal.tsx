import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Product } from "../types/Product";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../hooks/productHooks";

interface ProductModalProps {
  name: string;
  product?: Product;
}

export default function ProductModal({ name, product }: ProductModalProps) {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [nome, setNome] = useState<string>(product?.nome || "");
  const [slug, setSlug] = useState<string>(product?.slug || "");
  const [immagine, setImmagine] = useState<string>(product?.immagine || "");
  const [marca, setMarca] = useState<string>(product?.marca || "");
  const [categoria, setCategoria] = useState<string>(product?.categoria || "");
  const [descrizione, setDescrizione] = useState<string>(
    product?.descrizione || ""
  );
  const [prezzo, setPrezzo] = useState<number>(product?.prezzo || 0.0);
  const [disponibilita, setDisponibilita] = useState<number>(
    product?.disponibilita || 0
  );

  const { mutateAsync: createProduct } = useCreateProductMutation();
  const { mutateAsync: updateProduct } = useUpdateProductMutation();

  const closeHandler = () => setShow(false);
  const showHandler = () => {
    setShow(true);
  };

  const submitHandler = () => {
    try {
      if (product) {
        updateProduct({
          _id: product._id,
          nome,
          slug: product.slug,
          immagine,
          marca,
          categoria,
          descrizione,
          prezzo,
          disponibilita,
          valutazione: product.valutazione,
          numRecensioni: product.numRecensioni,
        });
        toast.success("Prodotto aggiornato con successo");
        navigate(0);
      } else {
        createProduct({
          nome,
          slug,
          immagine: "../images/T-shirt_U_ASTRO.jpeg",
          marca,
          categoria,
          descrizione,
          prezzo,
          disponibilita,
          valutazione: 0,
          numRecensioni: 0,
        });
        toast.success("Prodotto creato con successo");
        navigate(0);
      }
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  return (
    <>
      <Button variant="dark" onClick={showHandler}>
        {name}
      </Button>

      <Modal show={show} onHide={closeHandler}>
        <Form onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci nome prodotto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoFocus
                required
              />
            </Form.Group>

            {!product && (
              <Form.Group className="mb-3" controlId="slug">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="nome-prodotto-url"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            {product && (
              <Form.Group className="mb-3" controlId="immagine">
                <Form.Label>URL Immagine</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="../images/nome_immagine.jpeg"
                  value={immagine}
                  onChange={(e) => setImmagine(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="marca">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci marca"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="categoria">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="descrizione">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Inserisci descrizione"
                value={descrizione}
                onChange={(e) => setDescrizione(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="prezzo">
              <Form.Label>Prezzo</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.00"
                step="0.01"
                value={prezzo}
                onChange={(e) => setPrezzo(parseFloat(e.target.value))}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="disponibilita">
              <Form.Label>Disponibilità</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                value={disponibilita}
                onChange={(e) => setDisponibilita(parseInt(e.target.value, 10))}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeHandler}>
              Annulla
            </Button>
            <Button variant="primary" type="submit">
              Salva
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
