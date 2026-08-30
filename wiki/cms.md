# CMS (`ContentSchema` / `ContentObject`)

The site has one CMS blob in KV under key `"data"`; all three collections (Horses, Directors, Sponsors) live inside it. Schema names are the KV keys, so edit them carefully.

## Schemas

Declared in `client/src/data/schemas.ts`:

- `horseSchema` → name `Horses`; fields `name:string`, `description:string?`, `file:file`, `bf:array<number>?`
- `directorSchema` → name `Directors`; fields `name:string`, `title:string?`, `email:email?`, `phone:phone?`, `description:string?`, `file:file`
- `sponsorSchema` → name `Sponsors`; fields `category:string`, `items:array<object>` where `objectSchema` is `name:string`, `file:file?`, `href:url?`

Field types: `'string' | 'number' | 'array' | 'email' | 'phone' | 'file' | 'url'`.

**Naming rule**: schema names are plural capitalized (`Horses`, `Directors`, `Sponsors`) and are used as KV keys in the blob. Pages read `data.Horses`, `data.Directors`, `data.Sponsors` — a mismatch between schema name and page consumption breaks rendering. Keep names in sync.

## ContentObject shape

`client/src/components/cms/types.ts` defines `ContentObject`. For the `file` field, `FieldInput.tsx` stores `{ name, size, type, uploadKey, uploadedUrl }`. Pages build the image URL with `` `${CDN_HOST}/${object.file.uploadKey}` ``.

## Auto-save sync rule

`CMSEditor.tsx` keeps local `data` and watches it with a `useEffect` guarded by `_.isEqual`. If you change the shape of the blob, the editor will happily write the new shape to KV — make sure every page that reads it still understands it, or bump carefully.

## Image uploads

Uploads go to `PUT /upload-image?key=...` as a raw `ArrayBuffer` with the upload's MIME type, returning a public R2 URL. Keying is `{timestamp}-{filename}` — the `uploadKey` matters and must match the file extension/casing exactly (see [conventions.md](conventions.md)).

## How pages consume it

Pages read from `DataContext` (`GET /data?key=data`), then map `ContentObject`s to typed models (`mapToHorse`, `mapToDirector`) from `client/src/data/*.ts`. The legacy static arrays in `client/src/data/*.ts` are not used for rendering — only the interfaces are.
