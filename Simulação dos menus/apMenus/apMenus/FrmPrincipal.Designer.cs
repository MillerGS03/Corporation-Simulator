namespace apMenus
{
    partial class frmPrincipal
    {
        /// <summary>
        /// Variável de designer necessária.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Limpar os recursos que estão sendo usados.
        /// </summary>
        /// <param name="disposing">true se for necessário descartar os recursos gerenciados; caso contrário, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Código gerado pelo Windows Form Designer

        /// <summary>
        /// Método necessário para suporte ao Designer - não modifique 
        /// o conteúdo deste método com o editor de código.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnEstatisticas = new System.Windows.Forms.Button();
            this.btnMapa = new System.Windows.Forms.Button();
            this.btnConstrucao = new System.Windows.Forms.Button();
            this.btnCalendario = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // btnEstatisticas
            // 
            this.btnEstatisticas.Location = new System.Drawing.Point(15, 27);
            this.btnEstatisticas.Margin = new System.Windows.Forms.Padding(6, 5, 6, 5);
            this.btnEstatisticas.Name = "btnEstatisticas";
            this.btnEstatisticas.Size = new System.Drawing.Size(176, 42);
            this.btnEstatisticas.TabIndex = 0;
            this.btnEstatisticas.Text = "Estatísticas";
            this.btnEstatisticas.UseVisualStyleBackColor = true;
            this.btnEstatisticas.Click += new System.EventHandler(this.btnEstatisticas_Click);
            // 
            // btnMapa
            // 
            this.btnMapa.Location = new System.Drawing.Point(15, 132);
            this.btnMapa.Margin = new System.Windows.Forms.Padding(6, 5, 6, 5);
            this.btnMapa.Name = "btnMapa";
            this.btnMapa.Size = new System.Drawing.Size(176, 42);
            this.btnMapa.TabIndex = 1;
            this.btnMapa.Text = "Mapa";
            this.btnMapa.UseVisualStyleBackColor = true;
            // 
            // btnConstrucao
            // 
            this.btnConstrucao.Location = new System.Drawing.Point(15, 79);
            this.btnConstrucao.Margin = new System.Windows.Forms.Padding(6, 5, 6, 5);
            this.btnConstrucao.Name = "btnConstrucao";
            this.btnConstrucao.Size = new System.Drawing.Size(176, 42);
            this.btnConstrucao.TabIndex = 2;
            this.btnConstrucao.Text = "Construção";
            this.btnConstrucao.UseVisualStyleBackColor = true;
            this.btnConstrucao.Click += new System.EventHandler(this.btnConstrucao_Click);
            // 
            // btnCalendario
            // 
            this.btnCalendario.Location = new System.Drawing.Point(15, 184);
            this.btnCalendario.Margin = new System.Windows.Forms.Padding(6, 5, 6, 5);
            this.btnCalendario.Name = "btnCalendario";
            this.btnCalendario.Size = new System.Drawing.Size(176, 42);
            this.btnCalendario.TabIndex = 3;
            this.btnCalendario.Text = "Calendário";
            this.btnCalendario.UseVisualStyleBackColor = true;
            // 
            // frmPrincipal
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(11F, 22F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(206, 252);
            this.Controls.Add(this.btnCalendario);
            this.Controls.Add(this.btnConstrucao);
            this.Controls.Add(this.btnMapa);
            this.Controls.Add(this.btnEstatisticas);
            this.Font = new System.Drawing.Font("Century Gothic", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Margin = new System.Windows.Forms.Padding(6, 5, 6, 5);
            this.Name = "frmPrincipal";
            this.Text = "Menus";
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btnEstatisticas;
        private System.Windows.Forms.Button btnMapa;
        private System.Windows.Forms.Button btnConstrucao;
        private System.Windows.Forms.Button btnCalendario;
    }
}

