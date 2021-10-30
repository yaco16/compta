import React, { useContext } from 'react';
import { ThemeContext } from '../context/themeContext.js';

export default function Contenu() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={theme ? 'contenu light' : 'contenu dark'}>
      <h1>titre</h1>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae corporis ducimus quasi nostrum magnam ratione, molestias ipsam, id et
        laudantium blanditiis dignissimos voluptatum delectus voluptates cum. Itaque nostrum tempore eius, exercitationem iure tenetur atque modi odio
        natus recusandae repellendus autem ipsam eligendi. Saepe amet illo mollitia eveniet sequi eos consequatur, error dolorum voluptatem unde omnis
        molestias ea sit, molestiae exercitationem neque sint, tempore laudantium enim quam. Optio molestias labore nesciunt, at eius illo sapiente?
        Reiciendis voluptate maiores et aspernatur officia molestiae quasi cumque repellendus. Dicta, vitae qui maxime unde velit cumque. Animi
        perferendis voluptatibus, maxime delectus qui dolorem unde ea quidem doloremque ab. Modi dicta illo vero aspernatur quibusdam, illum vitae
        quam repudiandae rem ducimus, magnam eius rerum obcaecati laborum nihil magni hic ex quia pariatur. Ullam nisi laboriosam quas, libero
        perferendis eligendi, unde error recusandae ipsa tenetur dolores sint facilis exercitationem est deleniti mollitia. Omnis nisi fugit officia
        aperiam? Voluptatibus in dolores vitae accusamus ea accusantium quas, laboriosam numquam nam suscipit dignissimos mollitia delectus voluptas
        optio, enim quae blanditiis ullam! Earum doloribus, rem deleniti debitis sint excepturi et consectetur mollitia explicabo tempore incidunt,
        consequuntur, iste ducimus perferendis aliquid cupiditate! Est ratione, repellendus a, libero doloribus illum tempora quaerat nam accusantium
        nulla harum quidem ipsam fuga placeat autem soluta ipsa mollitia nesciunt voluptate? Nisi itaque hic fugit voluptatibus doloremque ratione
        natus qui soluta nobis quas deserunt delectus explicabo sequi, fuga expedita ducimus molestias, ab, cupiditate suscipit odit et architecto
        recusandae ipsum incidunt! Blanditiis rem quia repellendus, dolorem vel ullam consectetur soluta! Inventore, ipsa voluptas asperiores ducimus
        natus officiis neque vel nisi, nobis tenetur fugit deleniti, hic itaque laudantium impedit odit enim! Impedit earum laudantium eum odio eos

      </div>
      <style jsx>{`
        .contenu {
          font-size: 20px;
          text-align: justify;
          padding: 20px 4vw;
          height: 100vh;
          transition: all 0.2s ease-in-out;
        }

        .dark {
          color: #f1f1f1;
          background: #333;
        }

        .light {
          color: #333;
          background: #f1f1f1;
        }
      `}</style>
    </div>
  );
}
