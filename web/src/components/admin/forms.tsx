import {
  saveBlogPost,
  saveCourse,
  savePartner,
  saveProduct,
  saveProject,
  saveService,
} from "@/lib/actions/admin";
import { Checkbox, Field, FormCard, SubmitButton, TextArea } from "./ui";

function Hidden({ id }: { id?: string }) {
  return id ? <input type="hidden" name="id" value={id} /> : null;
}

type ProjectRec = {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  category: string | null;
  tag: string;
  image: string | null;
  featured: boolean;
  order: number;
};
export function ProjectForm({ record }: { record?: ProjectRec }) {
  return (
    <form action={saveProject}>
      <FormCard>
        <Hidden id={record?.id} />
        <Field label="BAŞLIK" name="title" defaultValue={record?.title} required />
        <Field label="SLUG (boş bırakılırsa otomatik)" name="slug" defaultValue={record?.slug} />
        <Field label="MÜŞTERİ" name="client" defaultValue={record?.client} />
        <Field label="KATEGORİ" name="category" defaultValue={record?.category} placeholder="MARKA / WEB / MOBİL" />
        <Field label="ETİKET" name="tag" defaultValue={record?.tag ?? "PROJE"} />
        <Field label="GÖRSEL URL" name="image" defaultValue={record?.image} />
        <Field label="SIRA" name="order" type="number" defaultValue={record?.order ?? 0} />
        <Checkbox label="Öne çıkan" name="featured" defaultChecked={record?.featured} />
        <SubmitButton />
      </FormCard>
    </form>
  );
}

type BlogRec = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  category: string | null;
  readTime: string | null;
  image: string | null;
  featured: boolean;
  publishedAt: Date | null;
};
export function BlogForm({ record }: { record?: BlogRec }) {
  return (
    <form action={saveBlogPost}>
      <FormCard>
        <Hidden id={record?.id} />
        <Field label="BAŞLIK" name="title" defaultValue={record?.title} required />
        <Field label="SLUG" name="slug" defaultValue={record?.slug} />
        <Field label="KATEGORİ" name="category" defaultValue={record?.category} />
        <Field label="OKUMA SÜRESİ" name="readTime" defaultValue={record?.readTime} placeholder="6 dk" />
        <Field label="GÖRSEL URL" name="image" defaultValue={record?.image} />
        <TextArea label="ÖZET" name="excerpt" defaultValue={record?.excerpt} />
        <TextArea label="İÇERİK (paragraflar boş satırla ayrılır)" name="body" defaultValue={record?.body} />
        <Checkbox label="Öne çıkan" name="featured" defaultChecked={record?.featured} />
        <Checkbox label="Yayında" name="published" defaultChecked={!!record?.publishedAt} />
        <SubmitButton />
      </FormCard>
    </form>
  );
}

type PriceRec = { id: string; title: string; slug: string; price: number };
export function ProductForm({ record }: { record?: PriceRec }) {
  return (
    <form action={saveProduct}>
      <FormCard>
        <Hidden id={record?.id} />
        <Field label="BAŞLIK" name="title" defaultValue={record?.title} required />
        <Field label="SLUG" name="slug" defaultValue={record?.slug} />
        <Field label="FİYAT (USD)" name="price" type="number" defaultValue={record?.price ?? 0} />
        <SubmitButton />
      </FormCard>
    </form>
  );
}

export function CourseForm({ record }: { record?: PriceRec }) {
  return (
    <form action={saveCourse}>
      <FormCard>
        <Hidden id={record?.id} />
        <Field label="BAŞLIK" name="title" defaultValue={record?.title} required />
        <Field label="SLUG" name="slug" defaultValue={record?.slug} />
        <Field label="FİYAT (₺)" name="price" type="number" defaultValue={record?.price ?? 0} />
        <SubmitButton />
      </FormCard>
    </form>
  );
}

type ServiceRec = { id: string; title: string; slug: string; description: string | null; order: number };
export function ServiceForm({ record }: { record?: ServiceRec }) {
  return (
    <form action={saveService}>
      <FormCard>
        <Hidden id={record?.id} />
        <Field label="BAŞLIK" name="title" defaultValue={record?.title} required />
        <Field label="SLUG" name="slug" defaultValue={record?.slug} />
        <TextArea label="AÇIKLAMA" name="description" defaultValue={record?.description} />
        <Field label="SIRA" name="order" type="number" defaultValue={record?.order ?? 0} />
        <SubmitButton />
      </FormCard>
    </form>
  );
}

type PartnerRec = { id: string; name: string; order: number };
export function PartnerForm({ record }: { record?: PartnerRec }) {
  return (
    <form action={savePartner}>
      <FormCard>
        <Hidden id={record?.id} />
        <Field label="AD" name="name" defaultValue={record?.name} required />
        <Field label="SIRA" name="order" type="number" defaultValue={record?.order ?? 0} />
        <SubmitButton />
      </FormCard>
    </form>
  );
}
